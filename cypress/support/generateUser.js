import { faker } from '@faker-js/faker';

function generateUserData() {
  return {
    firstName: faker.person.firstName(), 
    lastName: faker.person.lastName(), 
    pseudo: faker.internet.userName(),
    email: faker.internet.email({ provider: 'gmail.com' }), 
    role: Math.random() > 0.5 ? 'user' : 'admin'
  };
}
module.exports = generateUserData;