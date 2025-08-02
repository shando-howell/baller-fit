import { ProductCategory } from "./productCategory";
import { ProductStatus } from "./productStatus";

export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
    brand: string;
    color: string;
    description: string;
    status: ProductStatus;
    category: ProductCategory;
}