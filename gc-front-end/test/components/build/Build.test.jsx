import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import Build from "../../../src/components/build/Build";

describe("Build tests", () => {
  beforeEach(() => {
    render(<Build />);
  });

  //? US5-BLD-1
  test("It should show a dropdown with size options for the grid", () => {
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });
});
