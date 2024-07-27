const faker = require('faker');
function generateUserData() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    pseudo: faker.internet.userName(),
    email: faker.internet.email(null, null, 'gmail.com'),
    role: Math.random() > 0.5 ? 'user' : 'admin'
  };
}

module.exports = generateUserData;