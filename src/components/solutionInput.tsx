import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SolutionInputProps {
  solutions: { solution: string; text: string }[];
}

export const SolutionInput: React.FC<SolutionInputProps> = ({ solutions }) => {
  const [result, setResult] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const solution = formData.get("solution") as string;

    const normalizedSolution = solution.trim().toLowerCase();
    const foundSolution = solutions.find((s) => s.solution.trim().toLowerCase() === normalizedSolution);

    if (foundSolution) {
      return setResult(foundSolution.text);
    }
    return setResult("That's not the right person. Try again!");
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Submit Solution</h2>
      <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
        <Input name="solution" placeholder="Enter your solution here..." />
        <Button type="submit">Check Solution</Button>
      </form>
      {result && (
        <div role="alert" className="text-sm font-bold">
          <span>{result}</span>
        </div>
      )}
    </div>
  );
};
