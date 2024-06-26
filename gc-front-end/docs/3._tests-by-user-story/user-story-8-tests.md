# User story 8 tests

- As a user
- I want to view all griddler puzzles
- So that I can select a puzzle to solve

## Puzzles Card Tests (PZC)

- [x] US8-PZC-1: It should display the puzzleIndex
- [x] US8-PZC-2: It should call Link when clicked with the correct url

## Puzzles List Tests (PLT)

- [x] US8-PLT-1: It should all puzzles passed to it

## Puzzles Tests (PZL)

- [x] US8-PZL-1: It should call getAllPuzzles
- [ ] US8-PZL-2: It should display a loading spiner while getAllPuzzles is pending
- [ ] US8-PZL-3: It should display all puzzles with a heading for each size group when getAllPuzzles resolves
- [ ] US8-PZL-4: It should display a notification where getAllPuzzles finds no puzzles
- [ ] US8-PZL-4: It should display an error message where getAllPuzzles rejects

## Integration

### Navigation

- [ ] US8-INT-1: It should navigate to the correct page when a Puzzle card is clicked
