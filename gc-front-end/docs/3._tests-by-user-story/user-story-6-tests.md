# User story 6 tests

- As a signed-in user
- I want my pixel art to be used to seed griddler puzzles
- So that I can contribute to the Grid Cove community

## Puzzle Validator Tests (PVR)

- [x] US6-PVR-1: It should return true and an empty array where no errors
- [x] US6-PVR-2: It should return false and an errors array with a length greater than 0 where title is less than 3 characters
- [x] US6-PVR-3: It should return false and an errors array with a length greater than 0 where title is more than 32 characters
- [x] US6-PVR-4: It should return false and an errors array with a length greater than 0 where there is no pixel art string
- [x] US6-PVR-5: It should return false and an errors array with a length greater than 0 where one character comprises over 90% of the pixel art string

## Puzzle service tests (PZS)

- [x] US6-PZS-1: It should call axios post with the correct url and payload
- [x] US6-PZS-2: It should throw err if post rejects with standard error object
- [ ] US6-PZS-3: It should throw err?.response?.data where validation error received
- [ ] US6-PZS-4: It should return response data where axios resolves

## Build tests (BLD)

- [ ] US6-BLD-1: It should call createPuzzle on the puzzle service with the correct arguments
- [ ] US6-BLD-3: It should not display validation errors on render
- [ ] US6-BLD-4: It should display errors after clicking save where the title is too short
- [ ] US6-BLD-5: It should display errors after clicking save where the puzzleString is invalid
- [ ] US6-BLD-6: It should show a loading spinner while createPuzzle is pending
- [ ] US6-BLD-7: It should show a success modal when createPuzzle resolves
- [ ] US6-BLD-8: It should close the success modal when the close button is clicked
- [ ] US6-BLD-9: It should reset the grid cells to white when createPuzzle resolves
- [ ] US6-BLD-10: It should display errors in a modal when createPuzzle rejects
- [ ] US6-BLD-11: It should close the errors modal when the close button is clicked
