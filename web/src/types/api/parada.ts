export interface parada {
  id: number;
  id_linha: number;
  id_sentido: number;
  parada: string;
  minutos: number;
  criado_em: string;
  atualizado_em: string;
}

export interface response_parada {
  status: number;
  message: string;
  data: parada[];
}