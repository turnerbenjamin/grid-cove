# User story 8 tests

- As a user
- I want to view all griddler puzzles
- So that I can select a puzzle to solve

## Puzzles Card Tests (PZC)

- [x] US8-PZC-1: It should display the puzzleIndex
- [x] US8-PZC-2: It should navigate to the correct url when clicked

## Puzzles List Tests (PLT)

- [x] US8-PLT-1: It should all puzzles passed to it

## Puzzles Tests (PZL)

- [x] US8-PZL-1: It should call getAllPuzzles
- [x] US8-PZL-2: It should display a loading spiner while getAllPuzzles is pending
- [x] US8-PZL-3: It should display all puzzles with a heading for each size group when getAllPuzzles resolves
- [x] US8-PZL-4: It should display a notification where getAllPuzzles finds no puzzles
- [x] US8-PZL-5: It should display an error message where getAllPuzzles rejects
- [x] US8-PZL-6: It should navigate to the correct page when a Puzzle card is clicked

## Puzzle service tests (PZS)

- [x] US8-PZS-1: It should call axios get with the correct url
- [x] US8-PZS-2: It should throw err if get rejects with standard error object
- [x] US8-PZS-3: It should throw err?.response?.data where validation error received
- [x] US8-PZS-4: It should return response data where axios resolves
