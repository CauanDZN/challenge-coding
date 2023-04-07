import { linha } from "../api/linha";
import { parada } from "../api/parada";
import { sentido } from "../api/sentido";
import { viagem } from "../api/viagem";

export interface ViagemProps {
  cod: number;
  linha: linha;
  sentido: sentido;
  viagem: viagem;
  paradas: parada[];
} 