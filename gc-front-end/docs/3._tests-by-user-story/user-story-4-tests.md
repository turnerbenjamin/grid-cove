# User story 4 tests

- As a signed-in user
- I want to be be able to sign-out of my account
- So that I can prevent others with access to my device from using my account.

## Active user control (AUC)

- [x] US4-AUC-1: It should display a log-out button when hovered over
- [x] US4-AUC-2: It should not display a log-out button when mouse not hovered over

## Authentication service tests (AHS)

### Sign Out

- [x] US4-AHS-1: It should call axios post with the correct url
- [x] US4-AHS-2: It should return err if post rejects with standard error object
- [ ] US4-AHS-3: It should return err?.response?.data where validation error received
- [ ] US4-AHS-4: It should call remove item on local storage

### Get Active User

- [ ] US4-AHS-5: It should call get item on local storage
- [ ] US4-AHS-6: It should return the value returned from get item

## Integration Tests (INT)

- [x] US4-INT-1: It should make a call to the authentication service
- [x] US4-INT-2: It should show a loading spinner when the authentication service is loading
- [x] US4-INT-3: It should display an error modal where the auth service throws an error
- [x] US4-INT-4: It should show Register and Sign-In Buttons after successful log out
