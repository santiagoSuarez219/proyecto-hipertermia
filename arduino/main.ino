#include <Wire.h>
#include "MLX90640_API.h"
#include "MLX90640_I2C_Driver.h"
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

WiFiMulti wifiMulti;

const byte MLX90640_address = 0x33;

#define REF_PIN 23
#define TA_SHIFT 8

float           mlx90640To[768];
paramsMLX90640  mlx90640;

void setup(){
  Wire.begin();
  Wire.setClock(400000);
  Serial.begin(115200);
  wifiMulti.addAP("Convergentes", "RedesConvergentes*#");
  Serial.println("Conectando a Wifi");
  while(wifiMulti.run() != WL_CONNECTED){
    Serial.println(".");
  }
  Serial.println();
  Serial.println("Wifi Conectado");
  Serial.println("Direccion IP: ");
  Serial.println(WiFi.localIP());

  int status;
  uint16_t eeMLX90640[832];
  status = MLX90640_DumpEE(MLX90640_address, eeMLX90640);
  if (status != 0) Serial.println("Failed to load system parameters");
  status = MLX90640_ExtractParameters(eeMLX90640, &mlx90640);
  if (status != 0) Serial.println("Parameter extraction failed");
  MLX90640_SetRefreshRate(MLX90640_address, 0x01); //0x02 => Rate 2Hz; 0x03 => Rate 4Hz; 0x04 => Rate 8Hz; 0x05 => Rate 16Hz; 0x06 => Rate 32Hz; 0x07 => Rate 64Hz (Not recomended)
  Wire.setClock(1000000);
}

void loop()
{
  if (digitalRead(REF_PIN) == HIGH)
  {
    HTTPClient http;
    Serial.println("[HTTP] Iniciando ... ");
    http.begin("http://172.1.1.19:3000/api/v1/image/");
    http.addHeader("Content-Type", "application/json");
    Serial.println("[HTTP] POST...");
    // long startTime = millis();
    uint16_t mlx90640Frame[834];
    int status = MLX90640_GetFrameData(MLX90640_address, mlx90640Frame);
    float vdd = MLX90640_GetVdd(mlx90640Frame, &mlx90640);
    float Ta = MLX90640_GetTa(mlx90640Frame, &mlx90640);
    float tr = Ta - TA_SHIFT;
    float emis = 0.95;
    MLX90640_CalculateTo(mlx90640Frame, &mlx90640, emis, tr, mlx90640To);
    String thermalImage = "";
    // Serial.print(startTime);
    // Serial.print(",");
    for (int x = 0; x < 768; x++)
    {
      thermalImage += String(mlx90640To[x], 2) + ",";
      // Serial.print(mlx90640To[x],2);
      // Serial.print(",");
    }
    thermalImage.remove(thermalImage.length() - 1);
    String json = "{\"thermalImage\":[" + thermalImage + "]}";
    Serial.println(json);
    int httpCode = http.POST(json);
    String payload = http.getString();
    Serial.println(httpCode);
    Serial.println(payload);
    http.end();
    delay(1000);
  }
}
