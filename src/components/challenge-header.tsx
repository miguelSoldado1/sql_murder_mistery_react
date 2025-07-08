import React from "react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function HeaderWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

export function HeaderTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-2xl font-bold", className)} {...props} />;
}

export function HeaderDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} />;
}

interface HeaderBreadcrumbProps {
  children: React.ReactNode;
}

export function HeaderBreadcrumb({ children }: HeaderBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xl md:text-2xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">{children}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
