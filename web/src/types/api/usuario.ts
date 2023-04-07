import { reserva } from "./reserva";

export interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  nome_usuario: string;
  email: string;
  reservas: reserva[];
  criado_em: Date;
  atualizado_em?: Date;
}