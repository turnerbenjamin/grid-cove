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
- [x] US6-PZS-3: It should throw err?.response?.data where validation error received
- [x] US6-PZS-4: It should return response data where axios resolves

## Save Controls Tests (SVC)

These tests focus on link between the save control and the puzzle service. The grid context will be mocked to limit the number of user events required. The subsequent tests in Build will bridge the gap between this component and the grid context.

- [x] US6-SVC-1: It should call createPuzzle on the puzzle service with the correct arguments
- [x] US6-SVC-2: It should not display validation errors on render
- [x] US6-SVC-3: It should display errors after clicking save where the title is too short
- [x] US6-SVC-4: It should display errors after clicking save where the puzzleString is invalid
- [x] US6-SVC-5: It should show a loading spinner while createPuzzle is pending
- [x] US6-SVC-6: It should show a success modal when createPuzzle resolves
- [x] US6-SVC-7: It should close the success modal when the close button is clicked
- [x] US6-SVC-8: It should display errors in a modal when createPuzzle rejects
- [x] US6-SVC-9: It should close the errors modal when the close button is clicked
- [x] US6-SVC-10: It should display errors in a modal when createPuzzle rejects with an array of errors

## Build tests (BLD)

- [x] US6-BLD-1: It should call createPuzzle on the puzzle service with the correct arguments
- [x] US6-BLD-2: It should disable elements on the page when the puzzle service is loading
- [x] US6-BLD-3: It should reset the grid cells to white when createPuzzle resolves
