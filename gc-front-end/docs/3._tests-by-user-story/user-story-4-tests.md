# User story 4 tests

- As a signed-in user
- I want to be be able to sign-out of my account
- So that I can prevent others with access to my device from using my account.

## Active user control (AUC)

- [x] US4-AUC-1: It should display a log-out button when hovered over

## Integration Tests (INT)

- [x] US4-INT-1: It should make a call to the authentication service
- [x] US4-INT-2: It should show a loading spinner when the authentication service is loading
- [x] US4-INT-3: It should display an error modal where the auth service throws an error
- [x] US4-INT-4: It should show Register and Sign-In Buttons after successful log out
