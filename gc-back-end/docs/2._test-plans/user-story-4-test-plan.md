# User story 4 tests

- As a signed-in user
- I want to be be able to sign-out of my account
- So that I can prevent others with access to my device from using my account.

## Authentication Controller (AC)

- [x] AC4-1: It should call res.clearCookie with the correct argument
- [x] AC4-2: It should respond with a 204 success code and an empty body
- [x] AC3-3: It should respond with a 500 error code if clearCookie throws

## Integration Tests (INT)

- [x] INT4-1: It should respond with a 204 status code with valid request
- [x] INT4-2: It should have a header to set JWT to en empty string
- [ ] INT4-3: It should have an empty body in success response
- [ ] INT4-4: It should respond with a 500 error code if clearCookie throws
