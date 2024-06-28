# User story 5 tests

- As a signed-in user
- I want to be able to create pixel art
- I can express myself creatively

## Grid color tests (GCR)

- [x] US5-GCR-1: It should have the isDark property set to true where the sum of its RGB elements is less than 256
- [x] US5-GCR-2: It should have the isDark property set to false where the sum of its RGB elements is grater than or equal to 256

## Grid colors tests (GCS)

- [x] US5-GCS-1: It should return an array of 16 GridColour objects
- [x] US5-GCS-2: It should set unique colourCodes for each object
- [x] US5-GCS-3: It should return the correct colour by colour code

## Paint set tests(PTS)

- [x] US5-PTS-1: It should display the 16 colours returned from GridColours

## Paint pot tests (PTP)

- [x] US5-PTP-1: It should correctly set its RGB value and title based on the colour provided
- [x] US5-PTP-2: It should display a tick when selected
- [x] US5-PTP-3: It should display the correct tick colour where the colour is dark
- [x] US5-PTP-4: It should display the correct tick colour where the colour is not dark

## Grid Tests (GRD)

### General

- [x] US5-GRD-1: It should correctly colour a cell when that cell is clicked
- [x] US5-GRD-2: It should not colour cells when the mouse is moved over them

### Build configuration

- [x] US5-GRD-3: It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in the same row or column
- [x] US5-GRD-4: It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in a different row or column
- [x] US5-GRD-5: It should not continue to colour cells after a mouse up event

### Coverage

- [x] US5-GRD-6: It should not colour a cell where the right mouse button is clicked
- [x] US5-GRD-7: It should not colour a cell where the origin element clicked does not have a key data attribute
- [ ] US5-GRD-8: It should handle a mouse move over a non-cell element

## Build tests (BLD)

- [x] US5-BLD-1: It should show a dropdown with size options for the grid
- [x] US5-BLD-2: It should render a grid with the correct number of cells when an option is selected
- [x] US5-BLD-3: It should set the default fill style to black
- [x] US5-BLD-4: It should change the colour of a previously coloured cell when clicked having selected a new colour from the paint set
- [x] US5-BLD-5: It should render a grid with the correct number of cells when a non-default option is selected
