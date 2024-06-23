import { useState } from "react";

import { useGridContext } from "../../hooks/contexts/gridContext";
import Button from "../general/Button";

export default function GridSizeSelector() {
  const [selectedValue, setSelectedValue] = useState(5);
  const { setGridSize } = useGridContext();

  const options = [
    { label: "5x5", value: 5 },
    { label: "10x10", value: 10 },
    { label: "15x15", value: 15 },
  ];

  const renderedOptions = options.map((option) => {
    return (
      <option
        key={option.value}
        value={option.value}
        className="text-grid-black text-center px-4 py-1"
        role="option"
      >
        {option.label}
      </option>
    );
  });

  return (
    <div>
      <h2 className="text-lg mb-4">Choose your canvas:</h2>
      <select
        className="text-grid-black w-full py-1 text-center"
        name="cars"
        id="cars"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        role="menu"
      >
        {renderedOptions}
      </select>
      <div className="flex justify-center">
        <Button
          primary
          className="mt-6"
          onClick={() => setGridSize(selectedValue)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
