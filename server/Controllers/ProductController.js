const Category = require("../models/Category");
const Product = require("../models/Product");
const fs = require("fs");
const { validationResult } = require("express-validator");

class ProductController {
  static getCategories(req, res) {
    Category.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getProductsByCategory(req, res) {
    const { _id } = req.params;
    Product.find({ category: _id })
      .then(data => res.send(data))
      .catch(err => console.log(err));
  }

  static getAllProducts(req, res) {
    Product.find({})
      .then(data => res.send({ amount: data.length }))
      .catch(err => console.log(err));
  }

  static searchProduct(req, res) {
    const searchRegex = new RegExp(req.query.input);
    Product.find({
      name: { $regex: searchRegex, $options: "i" }
    })
      .then(data => res.send(data))
      .catch(err => console.log(err));
  }

  static addProduct(req, res) {
    const { name, price, category } = req.body;
    const newProduct = new Product({
      name,
      category,
      price,
      imagePath: ""
    });
    const errors = validationResult(req);
    if (!req.files) {
      errors.errors.push({
        value: "",
        msg: "Invalid value",
        param: "image",
        location: "body"
      });
    }
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      newProduct.imagePath = `http://localhost:3000/uploads/${newProduct._id}.jpg`;
      req.files.image.mv(
        `${__dirname}\\../uploads/${newProduct._id}.jpg`,
        function(err) {
          if (err) throw err;
        }
      );
      newProduct.save().then(data => res.send(data));
    }
  }

  static editProduct(req, res) {
    const { _id } = req.params;
    const editedProduct = req.body;
    if (req.files) {
      fs.unlink(`${__dirname}\\../uploads/${_id}.jpg`, err => {
        if (err) throw err;
        req.files.image.mv(`${__dirname}\\../uploads/${_id}.jpg`, function(
          err
        ) {
          if (err) throw err;
        });
      });
      editedProduct.imagePath = `http://localhost:3000/uploads/${_id}.jpg?${new Date().getTime()}`;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      Product.findByIdAndUpdate(
        { _id },
        editedProduct,
        { new: true, useFindAndModify: false },
        (err, product) => {
          // Handle any possible database errors
          if (err) throw err;
          res.send(product);
        }
      );
    }
  }

  static deleteProduct(req, res) {
    const { _id } = req.params;
    console.log(_id);
    Product.findOneAndDelete({ _id }).then(product => {
      fs.unlink(`${__dirname}\\../uploads/${_id}.jpg`, err => {
        if (err) throw err;
        res.send(product);
      });
    });
  }
}

module.exports = ProductController;
