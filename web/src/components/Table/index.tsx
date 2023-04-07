import { TableProps } from "../../types/components/table";
import { Main } from "./styles";

export default function Table({header, children}:TableProps) {
  return(
    <Main>
      <thead>
        <tr>
          {header.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {children}
      </tbody>
    </Main>
  )
}