const Order = require("../models/Order");
const Cart = require("../models/Cart");

class OrderController {
  static getAllOrders(req, res) {
    Order.find({})
      .then(data => res.send({ amount: data.length }))
      .catch(err => console.log(err));
  }

  static orderCart(req, res) {
    const { city, street, creditcard, dateToShip } = req.body.shippingAddress;
    const { totalPrice, user, cart } = req.body;
    const lastFourDigits = creditcard.slice(12, 16);
    Order.find({ dateToShip }).then(orders => {
      if (orders.length < 3) {
        const dateOrdered = new Date()
          .toJSON()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/");

        const newOrder = new Order({
          user,
          cart,
          totalPrice,
          city,
          street,
          dateToShip,
          dateOrdered,
          creditcard: lastFourDigits
        });

        newOrder.save().then(
          Cart.findByIdAndUpdate(
            cart,
            { active: false },
            { new: true, useFindAndModify: false },
            err => {
              // Handle any possible database errors
              if (err) throw err;
              res.send({ orderSubmitted: true });
            }
          )
        );
      } else {
        return res.status(422).json({ dateFull: true });
      }
    });
  }
}

module.exports = OrderController;
