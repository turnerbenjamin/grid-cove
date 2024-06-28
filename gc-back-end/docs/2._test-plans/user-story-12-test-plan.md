# User story 12 tests

- As an Admin
- I want to be able to remove puzzles
- So that I can take action where I believe that the pixel art behind a puzzle is not appropriate for the platform

## Puzzle Service (PS)

- [x] PS12-1: It should call findByIdAndDelete with the correct argument
- [x] PS12-2: It should throw an invalid puzzle id error where findByIdAndDelete rejects with a cast error
- [x] PS12-3: It should throw a puzzle not found error where findByIdAndDelete resolves with null
- [x] PS12-4: It should throw a server error if findByIdAndDelete rejects for any other reason

## Puzzle Controller (PC)

- [x] PC12-1: It should call deletePuzzleById on the puzzle service with the correct argument
- [x] PC12-2: It should respond with a status code of 204 where the puzzle service resolves
- [x] PC12-3: It should call res.json with no args where the puzzle service resolves
- [x] PC12-4: It should respond with a status code of 400 where the puzzle service rejects with an invalid puzzle id error
- [x] PC12-5: It should respond with a status code of 404 where the puzzle service rejects with a puzzle not found error
- [x] PC12-6: It should respond with a status code of 500 where the puzzle service rejects with a server error

## Authentication Controller (AC)

- [x] AC12-1: It should call next if req.user has an admin role
- [x] AC12-2: It should respond with a status code of 500 if req.user is null
- [x] AC12-3: It should respond with a status code of 403 if req.user does not have an admin role

## Integration Tests (INT)

- [x] INT12-1: It should respond with a status of 204 for a successful request
- [x] INT12-2: It should respond with an empty body for a successful request
- [x] INT12-3: It should respond with a 401 error if res.cookies.jwt is missing
- [x] INT12-4: It should respond with a 401 error if res.cookies.jwt is invalid
- [x] INT12-5: It should respond with a 403 error if the authenticated user does not have an admin role
- [x] INT12-6: It should respond with a status of 400 where the puzzleId is not in a valid format
- [x] INT12-7: It should respond with a status of 404 where the puzzleId is not found
- [ ] INT12-8: It should respond with a status of 500 where a server error is thrown
