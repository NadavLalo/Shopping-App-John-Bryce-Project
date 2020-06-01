const jwt = require("jsonwebtoken");


module.exports = function verifyToken (req, res, next) {
  const { token } = req.headers;
  if (!token) {
    res.sendStatus(403);
  } else {
    jwt.verify(token, "mySecret", function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  }
};