const jwt = require('jwt-simple');

const User = require('../models/user');
const { secret } = require('../../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signup = function(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(422).send({ error: 'missing sign up data' });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      console.log('There was an error');
      return next(err);
    }

    if (existingUser) {
      // 422 means unprocessible entity
      return res.status(422).send({ error: 'Email in use' });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = async function(req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  let token = tokenForUser(req.user);
  let decoded = jwt.decode(token, secret);
  console.log('Decoded is:', decoded);

  res.send({ token: token, user: user });
};
