import mongoose from "mongoose";

const cluesSchema = new mongoose.Schema({
  rowClues: {
    type: [[Number]],
    required: true,
  },
  columnClues: {
    type: [[Number]],
    required: true,
  },
});

const puzzleSchema = new mongoose.Schema({
  pixelArt: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  clues: {
    type: cluesSchema,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Puzzle = mongoose.model("Puzzle", puzzleSchema);
export default Puzzle;
