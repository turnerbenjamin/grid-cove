# User story 2 tests

- As a user
- I want to be prevented from creating an account with a weak password
- So that I can be assisted in keeping my account secure

## Integration Tests (INT)

- [x] INT2-1: It should respond with a 400 response if the password is less than 8 characters
- [x] INT2-2: It should respond with a 400 response if the password is more than 32 characters
- [x] INT2-3: It should respond with a 400 response if the password does not contain at least one digit
- [x] INT2-4: It should respond with a 400 response if the password does not contain at least one special character
