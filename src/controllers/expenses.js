const Expenses = require('../models/expenses');

exports.createExpense = function(req, res, next) {
  const { label, description, spendDate, ammount, userId, catId } = req.body;

//  const id = '5db1c1344e670a3c98f8f984';
  //const catId = '5db21175acbb7948642c3e32';

  // dylan2 id: "5ddcac3cb7ab95cbb09d2168"
  // dylan2 food cat id: "5ddcb8e708220e3a75e224fc"

  const expense = new Expenses({
    label,
    description,
    spendDate,
    ammount,
    _category: catId,
    _user: userId,
  });

  console.log("The expsne is: ", expense)

  expense.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json({ token: expense });
  });
};

exports.getExpenses = async function(req, res, next) {
  const id = '5db1c1344e670a3c98f8f984';
  //const catId = '5db21175acbb7948642c3e32';

  const expenses = await Expenses.find({ _user: id }).populate('_category');

  res.send(expenses);
};
