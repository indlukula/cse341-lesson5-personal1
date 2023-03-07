module.exports = (mongoose) => {
    const productSchema =  mongoose.Schema({
        productId: {
          type: Number
        },
        PLUcode: {
          type: Number
        },
        barcode: {
          type: Number
        },
        productName: {
          type: String
        },
        
        category: {
          type: String
        },
        packsize: {
            type: Number
        },
        quantity: {
            type: Number
        },
        unitprice: {
            type: Number
        },
        sellingPrice: {
            type: Number
        }
      });
    
    return mongoose.model('product', productSchema);
  };