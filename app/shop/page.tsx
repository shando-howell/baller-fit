import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FiltersForm from "./FiltersForm"
import { Suspense } from "react"
import { getProducts } from "@/data/products"
import Image from "next/image"

const Shop = async ({ 
  searchParams 
}: {
  searchParams: Promise<any>
}) => {
  const searchParamsValues = await searchParams;

  const parsedPage = parseInt(searchParamsValues?.page);
  const parsedMinPrice = parseInt(searchParamsValues?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValues?.maxPrice);
  // const category = searchParamsValues?.category;

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;

  const {data, totalPages} = await getProducts({
    pagination: {
      page,
      pageSize: 3
    },
    filters: {
      minPrice,
      maxPrice,
      // category
    }
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold p-5 text-sky-700">Shop</h1>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <FiltersForm />
          </Suspense>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 mt-5 gap-5">
        {data.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="px-0">
              <div className="h-40 relative">
                {/* {!!product.images?.[0] &&
                  <Image fill className="object-cover" src={} alt="" />
                } */}
                <Image 
                  fill 
                  className="object-cover" 
                  src="/images/Sneaker-Placeholder.jpg" 
                  alt="Placeholder Image" 
                />
              </div>
              <div>
                <h1>{product.name}</h1>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Shop