const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  label: { type: String, required: true },
  description: String,
  spendDate: Date,
  ammount: Number,
  _category: { type: Schema.Types.ObjectId, ref: "Categories"},
  _user: { type: Schema.Types.ObjectId, ref: "User"},
});

const ModelClass = mongoose.model('Expenses', expensesSchema);

module.exports = ModelClass;
