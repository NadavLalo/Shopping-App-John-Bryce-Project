const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");

class CartController {
  static getCart(req, res) {
    Cart.findOne({ user: req.query._id, active: true }).then(cart => {
      if (cart === null) {
        Order.find({ user: req.query._id }).then(order => {
          if (order.length > 0) {
            res.send({
              cart: {},
              lastOrder: order[order.length - 1].dateOrdered
            });
          } else {
            res.send({ cart: {} });
          }
        });
      } else {
        CartItem.find({ cart: cart._id })
          .populate("product")
          .exec((err, cartItems) => {
            if (err) throw err;
            res.send({ cart, cartItems });
          });
      }
    });
  }

  static addProductToCart(req, res) {
    let { cart } = req.query;
    let newCartItem;
    const { user } = req.query;
    const { product, amount } = req.body;
    const date = new Date()
      .toJSON()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/");
    if (cart === "undefined") {
      cart = new Cart({
        date: date,
        user,
        active: true
      });
      newCartItem = new CartItem({
        product: product._id,
        amount,
        price: product.price * amount,
        cart: cart._id
      });
      cart.save();
    } else {
      newCartItem = new CartItem({
        product: product._id,
        amount,
        price: product.price * amount,
        cart
      });
    }
    newCartItem.save().then(
      newCartItem.populate("product").execPopulate((err, newCartItem) => {
        if (typeof cart === "object") {
          res.send({ cart, newCartItem });
        } else {
          res.send({ newCartItem });
        }
      })
    );
  }

  static removeProductFromCart(req, res) {
    const { cart, item } = req.query;
    CartItem.findOneAndDelete({ _id: item, cart }).then(item => {
      res.send(item);
    });
  }
}

module.exports = CartController;
