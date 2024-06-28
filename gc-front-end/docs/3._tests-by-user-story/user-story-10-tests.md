# User story 10 tests

- As a user
- I want to be shown the pixel art that seeded the image
- So that I can enjoy the relationship between the solved puzzle and the image that seeded it

## Reveal Pixel Art Transition Tests

- [x] US10-RPA-1: It should return a number between 0 and the delay

## Cell tests

- [x] US10-CLL-1: It should call getDelay from RevealPixelArtTransition when doRevealPixelArt is true
- [x] US10-CLL-2: It should show hidden face when doRevealPixelArt is true
- [ ] US10-CLL-3: It should not show hidden face when doRevealPixelArt is false

## Solve Tests (SLV)

- [ ] US9-SLV-1: It should not show the pixel art on render
- [ ] US9-SLV-2: It should show the pixel art once the puzzle is solved
