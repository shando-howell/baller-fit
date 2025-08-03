"use client";

import ProductForm from "@/components/ProductForm";
import { Product } from "@/types/product";
import { productDataSchema } from "@/validation/productSchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";


type Props = Product;

const EditProductForm = ({
    id,
    name,
    price,
    stock,
    brand,
    color,
    description,
    status,
    category
}: Props) => {
    const handleSubmit = async (data: z.infer<typeof productDataSchema>) => {};
    return (
        <div>
            <ProductForm 
                handleSubmit={handleSubmit}
                submitButtonLabel={<><SaveIcon/> Save Product</>}
                defaultValues={{
                    name,
                    price,
                    stock,
                    brand,
                    color,
                    description,
                    status,
                    category,
                }}
            />
        </div>
    )
}

export default EditProductForm