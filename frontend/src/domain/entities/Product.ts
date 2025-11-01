// Alineado con lo que devuelve tu backend
export type Product = {
  id: number;                 // <- antes era _id
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  createdAt?: string;
};
