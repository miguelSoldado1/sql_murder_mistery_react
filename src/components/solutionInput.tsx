import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const murdererText =
  "Congrats, you found the murderer! But wait, there's more... If you think you're up for a challenge, try querying the interview transcript of the murderer to find the real villain behind this crime. If you feel especially confident in your SQL skills, try to complete this final step with no more than 2 queries. Use this same INSERT statement with your new suspect to check your answer.";
const villainText =
  "Congrats, you found the brains behind the murder! Everyone in SQL City hails you as the greatest SQL detective of all time. Time to break out the champagne!";
const failedText = "That's not the right person. Try again!";

export function SolutionInput() {
  const [result, setResult] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const solution = formData.get("solution") as string;

    if (solution.trim().toLowerCase() === "jeremy bowers") return setResult(murdererText);
    if (solution.trim().toLowerCase() === "miranda priestly") return setResult(villainText);
    return setResult(failedText);
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Submit Solution</h2>
      <form className="flex gap-4" onSubmit={handleSubmit}>
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
}
