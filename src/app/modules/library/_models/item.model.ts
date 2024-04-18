export class ItemModel {
  id: number
  title: string;
  brand: string;
  purchasedAt: Date;
  purpose: string;
  course: string;
  code: string;
  category: string;
  description: string;
  photoUrl: string;
  quantity: number;
  pieces: string;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
