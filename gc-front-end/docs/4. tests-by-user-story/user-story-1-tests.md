# User story 1 tests

- As a user
- I want to be able to register for an account
- So that I can access features restricted to registered users

## Modal (MDL)

The registration and sign-in forms are both displayed in a model element.

- [x] US1-MDL-1: It should render children passed as props
- [x] US1-MDL-2: It should call onClose when close button clicked
- [x] US1-MDL-3: It should not have a close button where this is not passed as an argument

## User Details Form (UDF)

### General Tests

These tests will be relevant for all configurations

- [x] US1-UDF-1: It should display the correct heading text
- [x] US1-UDF-2: It should display the correct submit button text
- [x] US1-UDF-3: It should show a loading spinner when the isLoading prop is true
- [x] US1-UDF-4: It should show disable all inputs when the isLoading prop is true
- [x] US1-UDF-5: It should show errors where a list of errors are passed as a prop
- [x] US1-UDF-6: It should disable the submit button when there are errors
- [x] US1-UDF-7: It should show call clearErrors after an update to a text box where the errors prop is provided

### Registration tests

These tests are specific to the registration form configuration

- [x] US1-UDF-8: It should display the correct fields for registration when correct config prop provided
- [ ] US1-UDF-9: It should call onSubmit with the correct details when the submit button is clicked
- [ ] US1-UDF-10: It should call onSubmit with the correct details when the enter key is typed
