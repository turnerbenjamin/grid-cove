# User story 6 tests

- As a signed-in user
- I want my pixel art to be used to seed griddler puzzles
- So that I can contribute to the Grid Cove community

Note, user story 5 related exclusively to frontend functionality.

## Authentication Service (AS)

- [x] AS6-1: It should call jwt.verify with correct arguments
- [x] AS6-2: It should throw an unauthorised error if jwt.verify throws
- [x] AS6-3: It should call findById on the User Service with correct id if verify resolves
- [x] AS6-4: It should throw a server error if findById rejects
- [x] AS6-5: It should throw an unauthorised error if findById returns a falsy value
- [x] AS6-6: It should return the user document

## Authentication Controller (AS)

- [x] AC6-1: It should respond with status code of 401 if no req.cookies.jwt
- [x] AC6-2: It should call validateToken on the user service
- [x] AC6-3: It should respond with status code of 401 if Authentication Service throws an unauthorised error
- [x] AC6-4: It should respond with status code of 500 if Authentication Service throws a server error
- [x] AC6-5: It should attach the user returned from the Authentication Service to req object
- [x] AC6-6: It should call next if the user service resolves

## Puzzle Generator (PG)

Note, I am keeping these tests relatively flexible. It is difficult to predict at this point the best approach to generating good quality puzzles from a given seed.

I will relocate grid size validation to a middleware validator

- [x] PG6-1: It should generate a solution string from a given pixel art string
- [x] PG6-2: It should throw an error if any one character makes up over 90 percent of the string
- [x] PG6-3: It should return a clues object with row and column properties which have two dimensional arrays, the length of which should equal the puzzle size
<!-- markdownlint-disable-next-line -->
- [x] <s> PG6-4: It should throw an error if the grid size is not a multiple of 5></s>
<!-- markdownlint-disable-next-line -->
- [x] <s>PG6-5: It should throw an error if the pixel art string does not match the grid size<s>

## Puzzle Service (PS)

- [x] PS6-1: It should call PuzzleGenerator with the pixel art string
- [x] PS6-2: It should call create on the Puzzle model with the correct arguments
- [x] PS6-3: It should throw a duplicate pixel art error where the pixel art is a duplicate
- [x] PS6-4: It should rethrow an invalid puzzle art distribution error where thrown by the Puzzle Generator
- [x] PS6-5: It should throw a server error for all other errors
- [x] PS6-6: It should return the new puzzle document where create resolves

## Puzzle Controller (PC)

- [x] PC6-1: It should call the puzzle service with the correct arguments
- [x] PC6-2: It should respond with a 400 status code if Puzzle Service throws a duplicate pixel art error
- [x] PC6-3: It should respond with a 400 status code if Puzzle Service throws a invalid character distribution error
- [x] PC6-4: It should respond with a 500 error code if Puzzle Service throws a server error
- [x] PC6-5: It should respond with a 201 status code if Puzzle Service resolves
- [x] PC6-6: It should call res.json with the value returned from puzzle service

## Integration Tests (INT)

- [x] INT6-1: It should respond with a 201 status code for a valid request
- [ ] INT6-2: It should return a new puzzle object for a valid request
- [ ] INT6-3: It should respond with a 401 status code if not req.cookies.jwt
- [ ] INT6-4: It should respond with a 401 status code if jwt.verify throws
- [ ] INT6-5: It should respond with a 401 status code if getById returns a falsy value
- [ ] INT6-6: It should respond with a 500 status code if getById rejects
- [ ] INT6-7: It should respond with a 400 status code if the puzzle art is duplicated
- [ ] INT6-8: It should respond with a 400 status code if the pixel art string distribution is invalid

### validation

- [ ] INT6-9: It should respond with a 400 status code if the grid size is missing
- [ ] INT6-10: It should respond with a 400 status code if the grid size is not greater or equal to 5
- [ ] INT6-11: It should respond with a 400 status code if the grid size is not less than or equal to 15
- [ ] INT6-12: It should respond with a 400 status code if the grid size is not a multiple of 5
- [ ] INT6-13: It should respond with a 400 status code if the pixel art string size is missing
- [ ] INT6-14: It should respond with a 400 status code if the pixel art string size length is not the square of the puzzle size
- [ ] INT6-15: It should respond with a 400 status code if the title is missing
- [ ] INT6-16: It should respond with a 400 status code if the title is not greater or equal to 3 chars
- [ ] INT6-17: It should respond with a 400 status code if the title is not less than or equal to 32 chars
