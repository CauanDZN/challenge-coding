import { ReactNode } from "react";

export interface ContainerProps {
  title?: string;
  spacing?: 1 | 2 | 3 | 4;
  children?: ReactNode;
}