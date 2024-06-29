# User story 12 tests

- As an Admin
- I want to be able to remove puzzles
- So that I can take action where I believe that the pixel art behind a puzzle is not appropriate for the platform

## Admin Actions tests (ADM)

- [x] US12-ADM-1: It should show a warning when delete is clicked before a call to delete puzzle is made
- [x] US12-ADM-2: It should close the warning and not call delete puzzle when cancel is called
- [x] US12-ADM-3: It should call delete when the user clicks proceed

## Solve Tests (SLV)

- [x] US12-SLV-1: It should show a loading spinner while delete puzzle is pending
- [x] US12-SLV-2: It should navigate to the correct url when delete puzzle resolves
- [x] US12-SLV-3: It should display errors if delete puzzle rejects
