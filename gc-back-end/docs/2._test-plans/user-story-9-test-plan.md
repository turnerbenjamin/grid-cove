# User story 9 tests

- As a user
- I want to be able to solve a selected griddler puzzle
- So that I have a fun activity to do in my fee time

## Puzzle Service (PS)

- [x] PS9-1: It should call findById with the correct argument
- [x] PS9-2: It should call populate
- [x] PS9-3: It should return the puzzle returned by findById
- [x] PS9-4: It should throw a puzzle not found error where findById returns a falsy value
- [x] PS9-5: It should throw an invalid puzzle id error where findById throws a cast error
- [x] PS9-6: It should throw a server error where findById rejects
- [x] PS9-7: It should throw a server error where populate rejects

## Puzzle Controller (PC)

- [x] PC9-1: It should call getPuzzleById on the puzzle service with the correct argument
- [x] PC9-2: It should respond with a status code of 200 where getPuzzleById resolves
- [x] PC9-3: It should respond with the value returned from getPuzzleById where getPuzzleById resolves
- [x] PC9-4: It should respond with a status code of 404 where getPuzzleById throws a puzzle not found error
- [x] PC9-5: It should respond with a status code of 400 where getPuzzleById throws an invalid puzzle id error
- [x] PC9-6: It should respond with a status code of 500 where getPuzzleById throws a server error

## Integration Tests (INT)

- [x] INT9-1: It should respond with a status of 200 for a successful request
- [x] INT9-2: It should respond with a correctly formatted puzzle object with a successful request
- [x] INT9-3: It should respond with a status of 404 where the puzzleId is not found
- [ ] INT9-3: It should respond with a status of 400 where the puzzleId is not in a valid format
- [ ] INT9-3: It should respond with a status of 500 where a server error is thrown
