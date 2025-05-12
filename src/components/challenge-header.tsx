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

export const HeaderWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("space-y-4", className)} {...props} />;
};

export const HeaderTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => {
  return <h1 className={cn("text-2xl font-bold", className)} {...props} />;
};

export const HeaderDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return <p {...props} />;
};

interface HeaderBreadcrumbProps {
  children: React.ReactNode;
}

export const HeaderBreadcrumb: React.FC<HeaderBreadcrumbProps> = ({ children }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xl">
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
};
