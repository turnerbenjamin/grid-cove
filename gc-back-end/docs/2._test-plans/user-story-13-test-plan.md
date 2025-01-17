# User story 13 tests

- As a registered user
- I want to be able to update my email address and username
- So that I can keep these details current

## User Service (US)

- [x] US13-1: It should call findByIdAndUpdate with the correct arguments
- [x] US13-2: It should throw a duplicate email address error where the email address is a duplicate
- [x] US13-3: It should throw a duplicate username error where the username is a duplicate
- [x] US13-4: It should throw a server error where findByIdAndUpdate rejects
- [x] US13-5: It should throw a server error where findByIdAndUpdate resolves with null
- [x] US13-6: It should return the value returned from findByIdAndUpdate where it resolves with a user object

## User Controller (UC)

- [x] UC13-1: It should call updateById on the user service with the correct argument
- [x] UC13-2: It should respond with a status code of 200 where updateUserById resolves
- [x] UC13-3: It should respond with the updated user where updateUserById resolves
- [x] UC13-4: It should respond with a status of 400 where the user service throws a duplicate email address error
- [x] UC13-5: It should respond with a status of 400 where the user service throws a duplicate username error
- [x] UC13-6: It should respond with a status code of 500 where updateUserById rejects

## Authentication Controller (AC)

- [x] AC13-1: It should throw an error where mismatch between req.user and req.params.userId

## Integration Tests (INT)

- [x] INT13-1: It should respond with a status of 200 for a successful request where username and email updated
- [x] INT13-2: It should respond with a status of 200 for a successful request where username only is updated
- [x] INT13-3: It should respond with a status of 200 for a successful request where email address only is updated
- [x] INT13-4: It should respond with the updated user document without the password for a successful request
- [x] INT13-5: It should respond with a 401 status code if no req.cookies.jwt
- [x] INT13-6: It should respond with a 401 status code if invalid req.cookies.jwt
- [x] INT13-7: It should respond with a 401 status code if user id in req.cookie does not match req.params.userId
- [x] INT13-8: It should respond with a 400 response if an email address is provided which is a duplicate
- [x] INT13-9: It should respond with a 400 response if a username is provided which is a duplicate
- [x] INT13-10: It should respond with a 400 response if neither username nor password are provided
- [x] INT13-11: It should respond with a status of 400 if req.body includes password
- [x] INT13-12: It should respond with a status of 400 if req.body includes roles
- [x] INT13-13: It should respond with a 400 response if a username is provided and it is too short
- [x] INT13-14: It should respond with a 400 response if a username is provided and it is too long
- [x] INT13-15: It should respond with a 400 response if a username is provided and it is contains invalid characters
- [x] INT13-16: It should respond with a 400 response if an email address is provided and it is invalid
- [x] INT13-17: It should respond with a 500 response if findByIdAndUpdate rejects
