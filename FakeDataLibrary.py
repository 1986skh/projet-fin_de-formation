from faker import Faker

class FakeDataLibrary:
    def __init__(self):
        self.faker = Faker()

    def generate_user_data(self):
        return {
            'firstName': self.faker.first_name(),
            'lastName': self.faker.last_name(),
            'pseudo': self.faker.user_name(),
            'email': self.faker.email(domain='gmail.com'),
            'role': 'user' if self.faker.random.choice([True, False]) else 'admin'
        }
