var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model("Category", CategorySchema);
