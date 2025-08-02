import { Breadcrumbs } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import NewProductForm from "./NewProductForm"

const NewProduct = () => {
  return (
    <div>
        <Breadcrumbs 
            items={[
                {
                    href: "/admin-dashboard",
                    label: "Dashboard",
                },
                {
                    label: "New Product",
                },
            ]}
        />
        <Card className="mt-5">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    New Product
                </CardTitle>
            </CardHeader>
            <CardContent>
                <NewProductForm />
            </CardContent>
        </Card>
    </div>
  )
}

export default NewProduct