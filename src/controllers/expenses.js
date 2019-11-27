const Expenses = require('../models/expenses');

exports.createExpense = function(req, res, next) {
  const { label, description, spendDate, ammount, userId, catId } = req.body;

  //  const id = '5db1c1344e670a3c98f8f984';
  //const catId = '5db21175acbb7948642c3e32';

  // dylan2 id: "5ddcac3cb7ab95cbb09d2168"
  // dylan2 food cat id: "5ddcb8e708220e3a75e224fc"

  if (!label || !description || !spendDate || !ammount || !userId || !catId) {
    res.status(422).send({ error: 'missing expense data' });
  }

  const expense = new Expenses({
    label,
    description,
    spendDate,
    ammount,
    _category: catId,
    _user: userId,
  });

  console.log('The expsene is: ', expense);

  expense.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json({ token: expense });
  });
};

exports.getExpenses = async function(req, res, next) {
  const { _id } = req.body;
  console.log('The id is', _id);
  //const id = '5ddcac3cb7ab95cbb09d2168';
  //const catId = '5db21175acbb7948642c3e32';
  // fuck category 5dde4743a1e48f0ba483f8d4

  //const expenses = await Expenses.find({ _user: id }).populate('5dde4743a1e48f0ba483f8d4');
  //const expenses = await Expenses.find({ _user: _id, _category: '5dde4743a1e48f0ba483f8d4'  })
  const expenses = await Expenses.find({ _user: _id });

  res.send(expenses);
};
