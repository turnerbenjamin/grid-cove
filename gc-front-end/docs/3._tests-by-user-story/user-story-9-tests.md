# User story 9 tests

- As a user
- I want to be able to solve a selected griddler puzzle
- So that I have a fun activity to do in my fee time

## Grid Solve State Tests (GSS)

- [x] US9-GSS-1: It should return false for a given row where the state of that row does not match its clue signature
- [x] US9-GSS-2: It should return true for a given row where it's state matches the solution
- [x] US9-GSS-3: It should return true for a given row where it's state matches the its clue signature but not the solution
- [x] US9-GSS-4: It should return false for a given column where the state of that column does not match its clue signature
- [x] US9-GSS-5: It should return true for a given column where it's state matches the solution
- [x] US9-GSS-6: It should return true for a given column where it's state matches the its clue signature but not the solution
- [x] US9-GSS-7: It should return false for isSolved where one or more lines does not match the relevant clue signature
- [ ] US9-GSS-8: It should return true for isSolved where all lines match the solution
- [ ] US9-GSS-9: It should return true for isSolved where all lines match their clue signatures but not the solution

## Mode Selector Tests(MDS)

- [ ] US9-MDS-1: It should display the 3 modes

## Mode Selector Tests (MDE)

- [ ] US9-MDE-1: It should correctly set its RGB value and title based on the colour provided
- [ ] US9-MDE-2: It should display a crossed out div where eliminate is selected
- [ ] US9-MDE-3: It should have a border where selected

## Clues Tests (CLS)

- [ ] US9-CLS-1: It should display all clues passed to it
- [ ] US9-CLS-2: It should show a 0 where a clue has no elements

## Clue Tests (CLU)

- [ ] US9-CLU-1: It should display each clue element
- [ ] US9-CLU-2: It should display as a flex row where isRow prop is true
- [ ] US9-CLU-3: It should display as a flex col where isRow prop is false
- [ ] US9-CLU-4: It should set opacity below 100 where the clue is solved
- [ ] US9-CLU-5: It should set opacity to 100 where the clue is not solved

## Cell Tests (CLL)

- [ ] US9-CLL-1: It should display a cross where its colour has the isEliminated property set to true

## Grid Tests (GRD)

### Solve configuration

- [ ] US9-GRD-1: It should not style cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in a different row or column
- [ ] US9-GRD-2: It should not colour cells when the mouse is moved over them between a mouse down and mouse up event where neither the mode, nor the fill style of the cell moved over, are set to white
- [ ] US9-GRD-3: It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the mode is white but the fill style is not
- [ ] US9-GRD-4: It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the fill style is white but the mode is not

## Solve Tests (SLV)

- [ ] US5-SLV-1: It should render a grid with the correct number of cells
- [ ] US5-SLV-2: It should set the default fill style to black
- [ ] US5-SLV-3: It should correctly change the style of a cell where a non-default mode is selected