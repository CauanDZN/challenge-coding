import { linha } from "../api/linha";
import { sentido } from "../api/sentido";
import { viagem } from "../api/viagem";

export interface HorarioProps {
  linha: linha;
  sentido: sentido;
  sentidos: sentido[];
  viagens: viagem[];
} 