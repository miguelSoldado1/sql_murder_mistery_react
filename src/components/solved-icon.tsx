import { TrophyIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function SolvedIcon() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TrophyIcon className="size-4" />
      </TooltipTrigger>
      <TooltipContent>You've solved this puzzle!</TooltipContent>
    </Tooltip>
  );
}
