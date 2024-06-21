# User story 3 tests

- As a registered user
- I want to be be able to sign-in to my account
- So that I can access features restricted to registered users

As with user story 1, I have modified tests written for challenge 5. I have removed the sign and send JWT middleware so that the controller has sole responsibility for the responses.

I have also removed the direct link between the service and the setting of status cods.

## Authorisation Service (AS)

### Sign-in

- [x] AS3-1: It should call findOne and select on the user model with the correct arguments
- [x] AS3-2: It should throw a server error where findOne fails
- [x] AS3-3: It should throw a user unauthorised error where server returns null
- [x] AS3-4: It should call compare on bcrypt with the correct arguments
- [x] AS3-5: It should respond with a server error where bcrypt fails
- [x] AS3-6: It should throw a user unauthorised error where bcrypt returns false
- [x] AS3-7: It should call sign on jwt with the correct arguments
- [ ] AS3-8: It should throw a server error if sign fails
- [ ] AS3-9: It should return the user, without the password, and an access token where no errors

## Authentication Controller (AC)

- [ ] AC3-1: It should call signInUser on the User Service with the correct argument
- [ ] AC3-2: It should respond with a 500 error if User Service throws a server error
- [ ] AC3-3: It should respond with a 401 error if User Service throws a user unauthorised error
- [ ] AC3-4: It should call res.cookie with valid arguments
- [ ] AC3-5: It should respond with a 500 error if cookie method fails
- [ ] AC3-6: It should respond with a 200 status code if no errors
- [ ] AC3-7: It should call res.json with the user value returned from signInUser where no errors

## Integration Tests (INT)

- [ ] INT3-1: It should respond with a 200 status code with valid request
- [ ] INT3-2: It should include the correct user details, without the password, in the response body
- [ ] INT3-3: It should have a header to set JWT in success response
- [ ] INT3-4: It should respond with a 401 response if email address is not found
- [ ] INT3-5: It should respond with a 401 response if passwords do not match
- [ ] INT3-6: It should respond with a 500 response if findOne and select fails
