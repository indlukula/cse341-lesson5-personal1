module.exports = (mongodb) => {
    const productSchema =  mongodb.Schema({
        productId: {
          type: String
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
      
    return mongodb.model('product', productSchema);
  };