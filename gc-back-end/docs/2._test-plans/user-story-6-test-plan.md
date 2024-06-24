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
- [ ] AC6-6: It should call next if the user service resolves

## Puzzle Generator (PG)

- [ ] PG6-1: It should generate a solution string from a given pixel art string
- [ ] PG6-2: It should return a clues object with row and column properties which have two dimensional arrays, the length of which should equal the puzzle size

## Puzzle Service (PS)

- [ ] PS6-1: It should call PuzzleGenerator with the pixel art string
- [ ] PS6-2: It should call create on the Puzzle model with the correct arguments
- [ ] PS6-3: It should throw a duplicate pixel art error where the pixel art is a duplicate
- [ ] PS6-4: It should throw a server error for all other errors
- [ ] PS6-5: It should return the new puzzle document where create resolves

## Puzzle Controller (PC)

- [ ] PC6-1: It should call the puzzle service with the correct arguments
- [ ] PC6-2: It should respond with a 400 status code if Puzzle Service throws a duplicate pixel art error
- [ ] PC6-3: It should respond with a 500 error code if Puzzle Service throws a server error
- [ ] PC6-4: It should respond with a 201 status code if Puzzle Service resolves
- [ ] PC6-5: It should call res.json with the value returned from puzzle service

## Integration Tests (INT)

- [ ] INT6-1: It should respond with a 201 status code for a valid request
- [ ] INT6-2: It should return a new puzzle object for a valid request
- [ ] INT6-3: It should respond with a 401 status code if not req.cookies.jwt
- [ ] INT6-4: It should respond with a 401 status code if jwt.verify throws
- [ ] INT6-5: It should respond with a 401 status code if getById returns a falsy value
- [ ] INT6-6: It should respond with a 500 status code if getById rejects
- [ ] INT6-7: It should respond with a 400 status code if the pixel art string is invalid
- [ ] INT6-8: It should respond with a 400 status code if the title is invalid
- [ ] INT6-9: It should respond with a 400 status code if the puzzle art is duplicated