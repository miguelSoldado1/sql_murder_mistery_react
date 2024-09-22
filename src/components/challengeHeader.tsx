import { cn } from "@/lib/utils";
import React from "react";

export function HeaderWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

export function HeaderTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-2xl font-bold", className)} {...props} />;
}

export function HeaderDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} />;
}

export function HeaderSchema({
  className,
  ...props
}: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return <img className={cn("mx-auto w-3/4", className)} draggable={false} {...props} />;
}
