# User story 13 tests

- As a registered user
- I want to be able to update my email address and username
- So that I can keep these details current

## Success toast tests (SCT)

- [x] US13-SCT-1: It should display success message
- [x] US13-SCT-2: It should call on close when close button clicked
- [x] US13-SCT-3: It should call setTimeout with correct arguments

## User details form (UDF)

This form has been well tested in the tests for user stories 1-3. These tests are focussed on additional functionality, for the profile configuration. Specifically, the use of default values.

- [x] US13-UDF-1: It should pre-populate fields where default values are provided for email address and password
- [x] US13-UDF-2: It should disable the save button when all fields match the default values
- [x] US13-UDF-3: It should not disable the save button when just one field does not match its default value

## User service tests (URS)

- [x] US13-URS-1: It should call axios get with the correct url
- [x] US13-URS-2: It should throw err if get rejects with standard error object
- [x] US13-URS-3: It should throw err?.response?.data where validation error received
- [x] US13-URS-4: It should call set data on local storage where axios resolves
- [x] US13-URS-5: It should return response data where axios resolves

## Profile (PFL)

### Update User

- [x] US13-PFL-1: It should call the user service with the correct arguments when save is clicked
- [x] US13-PFL-2: It should display a loading spinner while the user service is loading
- [x] US13-PFL-3: It should display errors where the user service rejects
- [x] US13-PFL-4: It should remove errors from the display once an update has been made to the form
- [x] US13-PFL-5: It should display a success message if the user service resolves
- [x] US13-PFL-6: It should not display a success message if the user clicks close
