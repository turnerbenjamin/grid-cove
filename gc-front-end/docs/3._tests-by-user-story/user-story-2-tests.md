# User story 2 tests

- As a user
- I want to be prevented from creating an account with a weak password
- So that I can be assisted in keeping my account secure

This user story relates to password validation. I will also include validation tests
for other fields as well, e.g username as the functionality is closely related.

## Form Validator (FVD)

- [x] US2-FVD-1: It should return true from isValidated where all active fields are valid
- [x] US2-FVD-2: It should return an error where the username is less than 8 characters
- [ ] US2-FVD-3: It should return an error where the username is more than 24 characters
- [ ] US2-FVD-4: It should return an error where the username contains invalid characters
- [ ] US2-FVD-5: It should return an error where the email is empty
- [ ] US2-FVD-6: It should return an error where the email is invalid
- [ ] US2-FVD-7: It should return an error where the password is less than 8 characters
- [ ] US2-FVD-8: It should return an error where the password is more than 32 characters
- [ ] US2-FVD-9: It should return an error where the password does not contain at least one digit
- [ ] US2-FVD-10: It should return an error where the password does not contain at least one special character
- [ ] US2-FVD-11: It should return false from isValidated where one field is invalid
