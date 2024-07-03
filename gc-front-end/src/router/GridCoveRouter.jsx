import { Routes, Route, Outlet } from "react-router-dom";

import { PuzzleContextProvider } from "../hooks/contexts/puzzleContext";
import Build from "../components/build/Build";
import Home from "../components/home/Home";
import Profile from "../components/profile/Profile";
import Puzzles from "../components/puzzles/Puzzles";
import RequireLoggedIn from "../components/general/RequireLoggedIn";
import Solve from "../components/solve/Solve";

export default function GridCoveRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/me"
        element={
          <RequireLoggedIn>
            <Profile />
          </RequireLoggedIn>
        }
      />
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

      <Route
        path="/build"
        element={
          <RequireLoggedIn>
            <Build />
          </RequireLoggedIn>
        }
      />
    </Routes>
  );
}
