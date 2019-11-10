const Expenses = require('../models/expenses');

exports.createExpense = function(req, res, next) {
  const { label, description, spendDate, ammount } = req.body;

  const id = '5db1c1344e670a3c98f8f984';
  const catId = '5db21175acbb7948642c3e32';

  const expenses = new Expenses({
    label,
    description,
    spendDate,
    ammount,
    _category: catId,
    _user: id,
  });

  expenses.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json({ token: 'expense saved!!' });
  });
};

exports.getExpenses = async function(req, res, next) {
  const id = '5db1c1344e670a3c98f8f984';
  //const catId = '5db21175acbb7948642c3e32';

  const expenses = await Expenses.find({ _user: id }).populate('_category');

  res.send(expenses);
};
