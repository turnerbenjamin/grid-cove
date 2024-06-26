# User story 8 tests

- As a user
- I want to view all griddler puzzles
- So that I can select a puzzle to solve

## Puzzle Service (PS)

- [x] PS8-1: It should call aggregate on the puzzle model
- [x] PS8-2: It should return an empty array when no puzzles found
- [x] PS8-3: It should return the result of this query when puzzles are found
- [x] PS8-4: It should reject with a server error if aggregate rejects

## Puzzle Controller (PC)

- [x] PC8-1: It should call getPuzzles on the puzzle service
- [x] PC8-2: It should call res.json with the response from getPuzzles where it resolves to an empty array
- [x] PC8-3: It should call res.json with the response from getPuzzles where it resolves to an array with a length greater than 0
- [x] PC8-4: It should call res.status with 200 where getPuzzles resolves
- [x] PC8-5: It should call res.status with 500 where getPuzzles rejects

## Integration Tests (INT)

- [x] INT8-1: It should respond with a status of 200 for a successful request
- [x] INT8-2: It should respond with a report in the correct format
- [ ] INT8-3: It should respond with a status of 200 where no puzzles found
- [ ] INT8-4: It should respond with an empty array where no puzzles found
- [ ] INT8-5: It should respond with a status of 500 where a server error is thrown
