import {z} from 'zod';

export const productDataSchema = z.object({
    name: z.string().min(1, "Name must contain a value"),
    price: z.coerce.number().positive("Price must be greater than zero"),
    stock: z.coerce.number().min(0, "Stock must be greater than zero"),
    brand: z.string().min(1, "Brand must contain a value"),
    color: z.string().min(1, "Color must contain a value"),
    description: z.string().min(40, "Description must contain at last 40 characters"),
    status: z.enum(["hot", "sale", "new-arrival"]),
    category: z.enum(["outwears", "jerseys", "hats", "accessories", "sneakers"]),
})