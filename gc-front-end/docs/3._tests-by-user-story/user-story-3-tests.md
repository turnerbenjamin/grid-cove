# User story 3 tests

- As a registered user
- I want to be be able to sign-in to my account
- So that I can access features restricted to registered users

## User Details Form (UDF)

A variety of tests have been implemented for this component for user story 1. This small set of tests is focussed on the sign-in form configuration.

- [x] US3-UDF-1: It should display the correct fields for registration when correct config prop provided
- [x] US3-UDF-2: "It should call onSubmit with the correct details when the submit button is clicked"

## Authentication service tests (AHS)

- [ ] US3-AHS-1: It should call axios post with the correct url and payload
- [ ] US3-AHS-2: It should throw err if post rejects with standard error object
- [ ] US3-AHS-3: It should throw err?.response?.data where validation error received
- [ ] US3-AHS-4: It should return response data where axios resolves

## Integration Tests (INT)

- [x] US3-INT-1: It should display a sign in form when the sign in button is clicked
- [ ] US3-INT-1: It should not display validation errors
- [ ] US3-INT-1: It should not disable submit where the values in the input fields would not pass validation
- [ ] US3-INT-2: It should make a call to the authentication service with the correct arguments on submit
- [ ] US3-INT-3: It should show a loading spinner when the authentication service is loading
- [ ] US3-INT-4: It should display the error where the authentication service returns an error
- [ ] US3-INT-5: It should display all errors where the authentication service returns multiple errors
- [ ] US3-INT-6: It should display display a success message where the authentication service resolves
- [ ] US3-INT-7: It should close the sign in form modal when the close button is pressed
