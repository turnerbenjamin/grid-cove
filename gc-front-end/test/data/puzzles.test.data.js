export const getAllPuzzlesTestData = [
  {
    size: 5,
    puzzles: [
      "667b67fe69053b11fd943b40",
      "667b684169053b11fd943b44",
      "667b686e69053b11fd943b48",
      "667b68a969053b11fd943b4c",
      "667b68d869053b11fd943b50",
    ],
  },
  {
    size: 10,
    puzzles: ["667b69a469053b11fd943b54", "667b6aa869053b11fd943b58"],
  },
  {
    size: 15,
    puzzles: ["667b6ba369053b11fd943b5c", "667b6d4d69053b11fd943b60"],
  },
];

export const getPuzzleTestData = {
  _id: "667b67fe69053b11fd943b40",
  pixelArt: "1114111D88144D81414188188",
  title: "Kong",
  solution: "1110111000100001010100100",
  size: 5,
  clues: {
    rowClues: [[3, 1], [2], [1], [1, 1, 1], [1]],
    columnClues: [[4], [2], [1, 2], [], [1, 1]],
  },
  artist: {
    username: "test-username",
  },
};

export const solvedWhenTopLeftCellFilled = {
  _id: "667b67fe69053b11fd943b40",
  pixelArt: "1114111D88144D81414188188",
  title: "EasySolve",
  solution: "1" + "0".repeat("99"),
  size: 10,
  clues: {
    rowClues: [[1], [], [], [], [], [], [], [], [], []],
    columnClues: [[1], [], [], [], [], [], [], [], [], []],
  },
  artist: {
    username: "test-username",
  },
};
