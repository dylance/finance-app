const Categories = require('../models/categories');

exports.createCategory = function(req, res, next) {
  const { category, id } = req.body;
  console.log("The id is: ", id)
  const categories = new Categories({
    category,
    _user: id
  });

  categories.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json({ token: 'categories saved!!' });
  });
};

exports.getCategories = async function(req, res, next) {
  const { id }  = req.body
  console.log("The iddd is: ", req.body)

  const categories = await Categories.find({_user: id })

  res.send(categories)
}





// dylan@dylan.com user id - 5db1c1344e670a3c98f8f984
