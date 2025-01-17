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
- [x] AC14-11: It should call res.clearCookie with the correct argument if the authentication service resolves

### require password (AC)

- [x] AC14-4: It should respond with a status of 500 if no req.user
- [x] AC14-5: It should respond with a status of 500 if no req.user.password
- [x] AC14-6: It should respond with a status of 401 if no req.body.password
- [x] AC14-7: It should call compare on bcrypt with the correct arguments
- [x] AC14-8: It should respond with a status of 403 if bcrypt returns false
- [x] AC14-9: It should respond with a status of 500 if bcrypt rejects
- [x] AC14-10: It should call next if bcrypt returns true

## Integration Tests (INT)

- [x] INT14-1: It should respond with a status of 200 for a successful request
- [x] INT14-2: It should respond with the updated user, without their password, for a successful request
- [x] INT14-3: It should respond with a 401 status code if no req.cookies.jwt
- [x] INT14-4: It should respond with a 401 status code if invalid req.cookies.jwt
- [x] INT14-5: It should respond with a 403 status code if the password does not match
- [x] INT14-6: It should respond with a 400 response if the updated password is missing
- [x] INT14-7: It should respond with a 400 response if the updated password is less than 8 characters
- [x] INT14-8: It should respond with a 400 response if the updated password is more than 32 characters
- [x] INT14-9: It should respond with a 400 response if the updated password does not contain at least one digit
- [x] INT14-10: It should respond with a 400 response if the updated password does not contain at least one special character
- [x] INT14-11: It should respond with a 500 response if findByIdAndUpdate rejects
- [x] INT14-12: It should update the password
- [x] INT14-13: It should have a header to set JWT to en empty string
