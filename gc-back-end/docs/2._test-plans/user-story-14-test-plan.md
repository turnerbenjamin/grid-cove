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
- [ ] AS14-5: It should throw a server error where findByIdAndUpdate resolves with null
- [ ] AS14-6: It should return the value returned from findByIdAndUpdate where it resolves with a user object

### signIn (AS)

- [] AS14-7: It should call select with the correct argument

### revalidate password (AS)

- [ ] AS14-8: It should throw a server error if no req.user
- [ ] AS14-9: It should throw a server error if no req.user.password
- [ ] AS14-10: It should throw a password revalidation error if no req.body.password
- [ ] AS14-11: It should call compare on bcrypt with the correct arguments
- [ ] AS14-12: It should respond with a password revalidation error if bcrypt returns false
- [ ] AS14-13: It should respond with a server error if bcrypt rejects
- [ ] AS14-14: It should return true if bcrypt returns true

## Authentication Controller (AC)

## update password (AC)

- [ ] AC14-1: It should call updatePassword by id on the authentication service with the correct arguments
- [ ] AC14-2: It should respond with 200 if the authentication service resolves
- [ ] AC14-3: It should respond with 500 if the authentication service rejects with a server error

## revalidate password (AC)

- [ ] AC14-4: It should call revalidatePassword on the authentication service
- [ ] AC14-5: It should call next if revalidatePassword resolves
- [ ] AC14-6: It should respond with a status code of 401 where revalidatePassword throws a password revalidation error
- [ ] AC14-7: It should respond with a status code of 500 where revalidatePassword throws a server error

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
