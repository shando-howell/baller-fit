import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/data/products";
import EditProductForm from "./EditProductForm";

const EditProduct = async ({params}: {
    params: Promise<any>
}) => {
    const paramsValue = await params;

    const product = await getProductById(paramsValue.productId);
    console.log(product);

    return (
        <div>
            <Breadcrumbs items={[{
                href: "/admin-dashboard",
                label: "Dashboard"
            }, {
                label: "Edit Product"
            }]} />
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Edit Product
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditProductForm 
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        brand={product.brand}
                        color={product.color}
                        description={product.description}
                        status={product.status}
                        category={product.category}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default EditProduct