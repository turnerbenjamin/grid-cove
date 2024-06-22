# User story 4 tests

- As a signed-in user
- I want to be be able to sign-out of my account
- So that I can prevent others with access to my device from using my account.

## Authentication Controller (AC)

- [x] AC4-1: It should call res.clearCookie with the correct argument
- [x] AC4-2: It should respond with a 204 success code and an empty body
- [ ] AC3-3: It should respond with a 500 error code if clearCookie throws

## Integration Tests (INT)

- [ ] INT3-1: It should respond with a 200 status code with valid request
- [ ] INT3-2: It should have a header to clear JWT in success response
- [ ] INT3-3: It should respond with a 500 error code if clearCookie throws
