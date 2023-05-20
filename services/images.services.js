const {models} = require('../libs/sequelize');
const moment = require('moment-timezone');

class ImageService {
    constructor(){}

    async find(){
      const rta = await models.Image.findAll();
      return rta;
    }

    async create(image){
      const newImage = {
        data: image,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        data_sensor: 0.0
      }
      console.log(newImage.fecha);
      const rta = await models.Images.create(newImage);
    }

    // async findOne(id) {
    //     const product = this.products.find(item => item.id === id);
    //     if (!product) {
    //       throw boom.notFound('product not found');
    //     }
    //     if (product.isBlock) {
    //       throw boom.conflict('product is block');
    //     }
    //     return product;
    //   }

    // async update(id, changes){
    //     const index = this.products.findIndex(item => item.id === id);
    //     if (index === -1) {
    //         throw boom.notFound('Product not found')
    //     }
    //     const product = this.products[index];
    //     this.products[index] = {
    //         ...product,
    //         ...changes
    //     };
    //     return this.products[index];
    // }

    // async delete(id){
    //     const index = this.products.findIndex(item => item.id === id);
    //     if (index === -1) {
    //         throw boom.notFound('Product not found')
    //     }
    //     this.products.splice(index,1);
    //     return {id};
    // }
}

module.exports = ImageService;
