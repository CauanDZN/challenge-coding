import { TableRowProps } from "../../types/components/table";
import { Main } from "./styles";

export default function TableRow ({data}:TableRowProps) {
  return(
    <Main>
      {Object.keys(data).map((item, index) => (
        <td key={item}>{data[item]}</td>
      ))}
    </Main>
  )
}