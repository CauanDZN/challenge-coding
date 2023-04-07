import { ReactNode } from "react";

export interface TableProps {
  header: string[];
  children: ReactNode;
}

export interface TableRowProps {
  data: object;
}