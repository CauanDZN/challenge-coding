import { Usuario } from "./usuario";
import { viagem } from "./viagem";

export interface reserva {
  id: number;
  id_viagem: number;
  id_usuario: number;
  cod: number;
  forma_pagamento: string;
  criado_em: string;
  atualizado_em: string;

  viagem: viagem;
  usuario: Usuario;
}

export interface response_reserva {
  status: number;
  message: string;
  data: reserva[];
}