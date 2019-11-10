const mongoose = require('mongoose');
// Tells mongoose about fields of our model
const Schema = mongoose.Schema;


const categoriesSchema = new Schema({
  category: String,
  _user: { type: Schema.Types.ObjectId, ref: "User"},
});

const ModelClass = mongoose.model('Categories', categoriesSchema);

module.exports = ModelClass;

// dylan@dylan.com id: 5db1c1344e670a3c98f8f984
