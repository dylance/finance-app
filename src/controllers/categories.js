const Categories = require('../models/categories');

exports.createCategory = function(req, res, next) {
  const { category, _id } = req.body;
  console.log("The id is: ", _id, category)
  const categories = new Categories({
    category,
    _user: _id
  });

  categories.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json({ token: 'categories saved!!' });
  });
};

exports.getCategories = async function(req, res, next) {
  const { _id }  = req.body
  console.log("The iddd is: ", req.body._id)

  const categories = await Categories.find({_user: _id })
  console.log("The categories are: ", categories)
  res.send(categories)
}


//5dc8eeca6043412db6b41cb7


// dylan@dylan.com user id - 5db1c1344e670a3c98f8f984
