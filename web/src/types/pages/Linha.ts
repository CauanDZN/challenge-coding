import { linha } from "../api/linha";
import { parada } from "../api/parada";
import { sentido } from "../api/sentido";

export interface LinhaProps {
  cod: number;
  linha: linha;
  sentido: sentido;
  sentidos: sentido[];
  paradas: parada[];
} 