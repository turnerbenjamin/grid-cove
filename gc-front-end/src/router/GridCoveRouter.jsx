import { Routes, Route, Outlet } from "react-router-dom";

import Build from "../components/build/Build";
import Home from "../components/home/Home";
import Puzzles from "../components/puzzles/Puzzles";
import Solve from "../components/solve/Solve";
import { PuzzleContextProvider } from "../hooks/contexts/puzzleContext";
import Profile from "../components/profile/Profile";

export default function GridCoveRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/me" element={<Profile />} />
      <Route
        element={
          <PuzzleContextProvider>
            <Outlet />
          </PuzzleContextProvider>
        }
      >
        <Route path="/puzzles" element={<Puzzles />} />
        <Route path="/puzzles/:puzzleId" element={<Solve />} />
      </Route>

      <Route path="/build" element={<Build />} />
    </Routes>
  );
}
