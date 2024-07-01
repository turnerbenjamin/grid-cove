# User story 14 tests

- As a registered user
- I want to be able to update my password
- So that I have an additional tool to help keep my account secure

## Update Password Form tests (UPF)

- [x] US14-UPF-1: It should disable the update button where the password field is empty
- [x] US14-UPF-2: It should not show validation errors on render
- [x] US14-UPF-3: It should not show validation errors when the password field is empty
- [x] US14-UPF-4: It should not show validation errors when the updated password field is blurred with a validation error
- [x] US14-UPF-5: It should show validation errors when the confirm updated password field is blurred with a validation error
- [x] US14-UPF-6: It should show a warning that the user will be logged out when the update button is active
- [x] US14-UPF-7: It should call updateUserPasswordById when update is pressed
- [x] US14-UPF-8: It should show a loading spinner when update password is loading
- [x] US14-UPF-9: It should disable inputs while update password is loading
- [x] US14-UPF-10: It should show errors where update password has errors
- [x] US14-UPF-11: It should disable the update button where update password has errors
- [x] US14-UPF-12: It should show call clearErrors, where update password has errors, after an update is made
- [x] US14-UPF-13: It should show a success message when updateUserPasswordById resolves
- [x] US14-UPF-14: It should not show a success message after the close button has been selected
- [x] US14-UPF-15: It should clear the input fields where updateUserPasswordById resolves
- [ ] US14-UPF-16: It should disable submit where validation errors

## Integration Tests

- [x] US14-INT-1: It should show a sign-in form where the user is not logged in
- [x] US14-INT-2: It should not show a sign in form when the user is logged in
- [x] US14-INT-3: It should show a sign in form if updateUserPasswordById resolves
- [x] US14-INT-4: It should not show a sign-in form and should stay on the same page where sign in resolves
- [ ] US14-INT-5: It should not show a sign-in form and navigate to root where close is selected
