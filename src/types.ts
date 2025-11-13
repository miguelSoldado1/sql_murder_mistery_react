import type { LinkProps } from "@tanstack/react-router";

export interface Solution {
  solution: string;
  text: string;
  final: boolean;
}

export interface Challenge {
  href: LinkProps["to"];
  title: string;
}
