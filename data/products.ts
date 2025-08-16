import { firestore, getTotalPages } from "@/firebase/server";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";
import "server-only"

type GetProductsOptions = {
    filters?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        category?: ProductCategory[] | null;
    },
    pagination?: {
        pageSize?: number;
        page?: number;
    }
}

export const getProducts = async (options?: GetProductsOptions) => {
    const page = options?.pagination?.page || 1;
    const pageSize = options?.pagination?.pageSize || 10;
    const {minPrice, maxPrice} = options?.filters || {};

    let productsQuery = firestore.collection("products").orderBy("updated", "desc");

    if (minPrice !== null && minPrice !== undefined) {
        productsQuery = productsQuery.where("price", ">=", "minPrice");
    }

    if (maxPrice !== null && minPrice !== undefined) {
        productsQuery = productsQuery.where("price", "<=", "maxPrice");
    }

    // if (category) {
    //     productsQuery = productsQuery.where("category", "in", "category");
    // }

    const totalPages = await getTotalPages(productsQuery, pageSize);

    const productsSnapshot = await productsQuery
        .limit(pageSize)
        .offset((page - 1) * pageSize).get();

        const products = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));

        return { data: products, totalPages };
}

export const getProductById = async (productId: string) => {
    const productSnapshot = await firestore
        .collection("products")
        .doc(productId)
        .get();

        const productData = { id: productSnapshot.id, ...productSnapshot.data() } as Product;
        return productData;
}