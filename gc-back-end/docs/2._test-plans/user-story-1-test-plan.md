# User Story 1 Test Plan

These tests are modifications of those from challenge 5. I am making a couple of adjustments to the approach I took in that challenge:

First, I am moving the hashing functionality from the controller to the service. This is because I read that controllers are responsible "only for receiving the request and displaying the result of the operation"

Second, in challenge 5 I used a wrapper class, HTTPError, to pass a status code from the service to the controller. I don't want the service to be responsible for the status of the response. I will instead use a dictionary of error messages that the service can throw and the controller can translate into a suitable response code. This should also make it easier to keep error messages consistent and easy to change.

## Authentication Service (AS)

- [x] AS1-1: It should call hash on bcrypt with the password
- [x] AS1-2: It should throw a server error where hash fails
- [x] AS1-3: It should call create on the user model with the correct arguments
- [x] AS1-4: It should throw a duplicate email address error where the email address is a duplicate
- [x] AS1-5: It should throw a duplicate username error where the username is a duplicate
- [x] AS1-6: It should throw a server error for all other errors
- [x] AS1-7: It should return the new user's details, without the password

## Authentication Controller (AC)

- [x] AC1-1: It should call createUser on the Authentication service with the correct arguments
- [x] AC1-2: It should respond with a 201 status if the user was created successfully
- [x] AC1-3: It should call res.json with the value returned from the authentication service
- [x] AC1-4: It should respond with a status of 400 if the authentication service throws a duplicate email address error
- [x] AC1-5: It should respond with a status of 400 if the authentication service throws a duplicate username error
- [x] AC1-6: It should respond with a status code of 500 if the User service throws a server error

### Integration Tests (INT)

- [x] INT1-1: It should respond with a 201 status code with valid request
- [x] INT1-2: It should return the new user's details without the password
- [ ] INT1-3: It should respond with a 400 response if the username is missing
- [ ] INT1-4: It should respond with a 400 response if the username is invalid
- [ ] INT1-5: It should respond with a 400 response if the email address missing
- [ ] INT1-6: It should respond with a 400 response if the email address is invalid
- [ ] INT1-7: It should respond with a 400 response if the password is missing
- [ ] INT1-8: It should respond with a 400 response if the password is invalid
- [ ] INT1-9: It should respond with a 400 response if the email address is duplicated
- [ ] INT1-10: It should respond with a 400 response if the username is duplicated
- [ ] INT1-11: It should respond with a 500 response if create fails
- [ ] INT1-12: It should create the user in the database
- [ ] INT1-13: It should not include password field in doc returned from database by default
- [ ] INT1-14: It should store hashed password
