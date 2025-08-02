"use client";

import ProductForm from "@/components/ProductForm";
import { useAuth } from "@/context/auth";
import { productDataSchema } from "@/validation/productSchema";
import { PlusCircleIcon } from "lucide-react";
import z from "zod";
import { saveNewProduct } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewProductForm = () => {
    const auth = useAuth();
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof productDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken();

        if(!token) {
            return;
        }

        const response = await saveNewProduct({...data, token});
        if(!!response.error) {
            toast.error("Error!", {
                description: response.error
            });
            return;
        }

        toast.success("Success!", {
            description: "Product added",
        });

        router.push("/admin-dashboard");

        console.log({ response });
    };

    return (
        <div>
            <ProductForm handleSubmit={handleSubmit} submitButtonLabel={<>
                <PlusCircleIcon /> Add Product
            </>}/>
        </div>
    )
}

export default NewProductForm;