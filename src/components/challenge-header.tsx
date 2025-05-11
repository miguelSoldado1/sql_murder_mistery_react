import React from "react";
import { cn } from "@/lib/utils";

export const HeaderWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("space-y-4", className)} {...props} />;
};

export const HeaderTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => {
  return <h1 className={cn("text-2xl font-bold", className)} {...props} />;
};

export const HeaderDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return <p {...props} />;
};

export const HeaderSchema: React.FC<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ className, ...props }) => {
  return <img className={cn("mx-auto w-3/4", className)} draggable={false} {...props} />;
};
