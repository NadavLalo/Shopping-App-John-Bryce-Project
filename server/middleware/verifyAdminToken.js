const jwt = require("jsonwebtoken");

module.exports =  function verifyAdminToken  (req, res, next) {
    const { token } = req.headers;
    if (!token) {
      res.sendStatus(403);
    } else {
      // console.log(token);
      const decoded = jwt.verify(token, "mySecret");
      // console.log(decoded);
      if (decoded.role === "Admin") {
        next();
      } else {
        res.sendStatus(403);
      }
    }
  };