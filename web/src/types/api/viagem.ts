import { linha } from "./linha";
import { sentido } from "./sentido";

export interface viagem {
  id: number;
  id_linha: number;
  id_sentido: number;
  data: string;
  origem: string;
  destino: string;
  horario_partida: string;
  horario_chegada?: string;
  duracao_media: number;
  pago_inteira: number;
  pago_meia: number;
  gratuidade: number;
  assentos_disponiveis: number;
  assentos_ocupados: number;
  criado_em: string;
  atualizado_em: string;
  linha: linha;
  sentido: sentido;
}

export interface response_viagem {
  status: number;
  message: string;
  data: viagem[];
}