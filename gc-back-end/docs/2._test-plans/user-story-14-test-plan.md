# User story 14 tests

- As a registered user
- I want to be able to update my email address and username
- So that I can keep these details current

## Authentication Service (AS)

### update password (AS)

- [x] AS14-1: It should call hash on bcrypt with the password
- [x] AS14-2: It should throw a server error where hash fails
- [x] AS14-3: It should call findByIdAndUpdate with the correct arguments
- [x] AS14-4: It should throw a server error where findByIdAndUpdate rejects
- [x] AS14-5: It should throw a server error where findByIdAndUpdate resolves with null
- [x] AS14-6: It should return the value returned from findByIdAndUpdate where it resolves with a user object

### validate token (AS)

- [x] AS14-7: It should call select with the correct argument

## Authentication Controller (AC)

### update password (AC)

- [x] AC14-1: It should call updatePassword by id on the authentication service with the correct arguments
- [x] AC14-2: It should respond with 200 if the authentication service resolves
- [x] AC14-3: It should respond with 500 if the authentication service rejects with a server error

### require password (AC)

- [x] AC14-4: It should respond with a status of 500 if no req.user
- [x] AC14-5: It should respond with a status of 500 if no req.user.password
- [x] AC14-6: It should respond with a status of 401 if no req.body.password
- [x] AC14-7: It should call compare on bcrypt with the correct arguments
- [x] AC14-8: It should respond with a status of 401 if bcrypt returns false
- [x] AC14-9: It should respond with a status of 500 if bcrypt rejects
- [ ] AC14-10: It call next if bcrypt returns true

## Integration Tests (INT)

- [ ] INT14-1: It should respond with a status of 200 for a successful request
- [ ] INT14-2: It should respond with the updated user, without their password, for a successful request
- [ ] INT14-3: It should respond with a 401 status code if no req.cookies.jwt
- [ ] INT14-4: It should respond with a 401 status code if invalid req.cookies.jwt
- [ ] INT14-5: It should respond with a 401 status code if user id in req.cookie does not match req.params.userId
- [ ] INT14-6: It should respond with a 401 status code if the password does not match
- [ ] INT14-7: It should respond with a 400 response if the updated password is missing
- [ ] INT14-8: It should respond with a 400 response if the updated password is less than 8 characters
- [ ] INT14-9: It should respond with a 400 response if the updated password is more than 32 characters
- [ ] INT14-10: It should respond with a 400 response if the updated password does not contain at least one digit
- [ ] INT14-11: It should respond with a 400 response if the updated password does not contain at least one special character
- [ ] INT14-12: It should respond with a 500 response if findByIdAndUpdate rejects
