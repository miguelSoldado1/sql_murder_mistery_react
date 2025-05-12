import React, { useState } from "react";
import { getLocalStorageKey } from "@/lib/utils";
import { useRouterState } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { Solution } from "@/types";

interface SolutionInputProps {
  solutions: Solution[];
}

const WRONG_SOLUTION = "That's not the right person. Try again!";

export const SolutionInput: React.FC<SolutionInputProps> = ({ solutions }) => {
  const [result, setResult] = useState("");
  const router = useRouterState();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const solution = formData.get("solution") as string;

    const normalizedSolution = solution.trim().toLowerCase();
    const foundSolution = solutions.find((s) => s.solution.trim().toLowerCase() === normalizedSolution);

    if (foundSolution) {
      if (foundSolution.final) {
        const key = getLocalStorageKey(router.location.pathname);
        const puzzleSolution = localStorage.getItem(key);
        if (!puzzleSolution) localStorage.setItem(key, "true");
      }

      return setResult(foundSolution.text);
    }

    return setResult(WRONG_SOLUTION);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Submit Solution</h2>
      <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
        <Input name="solution" placeholder="Enter your solution here..." />
        <Button type="submit" className="flex-1 gap-2">
          <CheckIcon className="size-4" />
          Check Solution
        </Button>
      </form>
      {result && (
        <div role="alert" className="text-sm font-bold">
          <span>{result}</span>
        </div>
      )}
    </div>
  );
};
