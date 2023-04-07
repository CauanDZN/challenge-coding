export interface sentido {
  id: number;
  id_linha: number;
  sentido: string;
  ponto_partida: string;
  ponto_destino: string;
  horario_inicio: string;
  horario_fim: string;
  criado_em: string;
  atualizado_em: string;
}

export interface response_sentido {
  status: number;
  message: string;
  data: sentido[];
}