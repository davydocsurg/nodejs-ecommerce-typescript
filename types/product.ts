export interface ProductDetails {
    // id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

export interface ProductObj {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    id: string;
}
