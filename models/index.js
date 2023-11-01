const User = require('./user');
const Pet = require('./Pet');

User.associate({ Pet });
Pet.associate({ User });

module.exports = { User, Pet };
