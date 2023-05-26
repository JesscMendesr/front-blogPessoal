import { Tema } from "./Tema";
import User from "./User";

export interface Postagem{
  id: number;
  titulo: string;
  texto: string;
  tema?: Tema| null;
  usuario?: User | null // linha adicionada para vincular um usuário
}