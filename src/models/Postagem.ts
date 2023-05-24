import { Tema } from "./Tema";

export interface Postagem{
  id: number;
  titulo: string;
  texto: string;
  tema?: Tema| null
}