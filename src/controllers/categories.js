const Categories = require('../models/categories');

exports.createCategory = function(req, res, next) {
  const { category, _id } = req.body;

  const categories = new Categories({
    category,
    _user: _id,
  });

  categories.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json({ sucess: 'categories saved!!' });
  });
};

exports.getCategories = async function(req, res, next) {
  const { _id } = req.body;

  if (_id) {
    const categories = await Categories.find({ _user: _id });
    res.send(categories);
  }

  res.status(400).send({
    message: 'User id required to make this request',
  });
};
