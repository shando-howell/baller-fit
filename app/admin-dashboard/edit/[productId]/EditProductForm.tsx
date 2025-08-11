"use client";

import ProductForm from "@/components/ProductForm";
import { auth } from "@/firebase/client";
import { Product } from "@/types/product";
import { productDataSchema } from "@/validation/productSchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProduct } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


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
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof productDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken();

        if (!token) {
            return;
        }

        await updateProduct({...data, id}, token);
        toast.success("Success!", {
            description: "Product updated",
        });
        router.push("/admin-dashboard")
    };
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