# User story 2 tests

- As a user
- I want to be prevented from creating an account with a weak password
- So that I can be assisted in keeping my account secure

This user story relates to password validation. I will also include validation tests
for other fields as well, e.g username as the functionality is closely related.

## Form Validator (FVD)

- [x] US2-FVD-1: It should return true from isValidated where all active fields are valid
- [x] US2-FVD-2: It should return an error where the username is less than 8 characters
- [x] US2-FVD-3: It should return an error where the username is more than 24 characters
- [x] US2-FVD-4: It should return an error where the username contains invalid characters
- [x] US2-FVD-5: It should return true where the username is valid
- [x] US2-FVD-6: It should return an error where the email is empty
- [x] US2-FVD-7: It should return an error where the email is invalid
- [x] US2-FVD-8: It should return true where the emailAddress is valid
- [x] US2-FVD-9: It should return an error where the password is less than 8 characters
- [x] US2-FVD-10: It should return an error where the password is more than 32 characters
- [x] US2-FVD-11: It should return an error where the password does not contain at least one digit
- [x] US2-FVD-12: It should return an error where the password does not contain at least one special character
- [x] US2-FVD-13: It should return true where the password is valid
- [x] US2-FVD-14: It should return false where password and confirmPassword do not match
- [x] US2-FVD-15: It should return true where password and confirmPassword do match
- [x] US2-FVD-16: It should return false from isValidated where one field is invalid

## Input Fields

### User name input field (UNI)

- [x] US2-UNI-1: It should not display an error on render
- [x] US2-UNI-2: It should display an error on blur where username is invalid
- [x] US2-UNI-3: It should not display an error on blur where username is valid

### Email address input field (EAI)

- [x] US2-EAI-1: It should not display an error on render
- [x] US2-EAI-2: It should display an error on blur where email address is invalid
- [x] US2-EAI-3: It should not display an error on blur where email address is valid

### Password input field (PWI)

- [x] US2-PWI-1: It should not display an error on render
- [x] US2-PWI-2: It should display an error on blur where password is invalid
- [x] US2-PWI-3: It should not display an error on blur where password is valid

### Password input field (CPI)

- [ ] US2-CPI-1: It should not display an error on render
- [ ] US2-CPI-2: It should display an error on blur where passwords do not match
- [ ] US2-CPI-3: It should not display an error on blur where passwords do match
