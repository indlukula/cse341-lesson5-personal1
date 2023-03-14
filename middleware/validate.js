const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    password: 'required|string',
    email: 'required|email',
    phone: 'required|string',
    designation: 'required|string'

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser
};

const saveProduct = (req, res, next) => {
    const validationRule = {
      PLUcode: 'required|number',
      barcode: 'required|number',
      productName: 'required|string',
      packsize: 'required|number',
      quantity: 'required|number',
      unitprice: 'required|number',
      category: 'required|string',
      sellingPrice: 'required|number'
  
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  


  module.exports = {
    saveProduct,
    saveUser
  };