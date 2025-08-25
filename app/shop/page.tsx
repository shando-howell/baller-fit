import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FiltersForm from "./FiltersForm"
import { Suspense } from "react"
import { getProducts } from "@/data/products"
import Image from "next/image"
import numeral from "numeral"
import ProductStatusBadge from "@/components/ProductStatusBadge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddToCartButton from "./AddToCartButton"
import { getUserCart } from "@/data/cart"
import { cookies } from "next/headers"
import { auth } from "@/firebase/server"
import { DecodedIdToken } from "firebase-admin/auth"

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

  const userCart = await getUserCart();

  console.log({userCart});

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  let verifiedToken: DecodedIdToken | null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

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
            <CardContent className="px-0 pb-0">
              <div className="h-40 relative">
                {/* {!!product.images?.[0] &&
                  <Image fill className="object-cover" src={} alt="" />
                } */}
                <Image 
                  fill 
                  className="object-cover" 
                  src="/images/sneaker-placeholder.jpg" 
                  alt="Placeholder Image" 
                />
              </div>
              <div className="flex flex-col gap-4 p-4">
                <h1>{product.brand} {product.name}</h1>
                <div className="flex gap-5">
                  <div className="text-2xl">
                    ${numeral(product.price).format("0,0")}
                  </div>
                  <div>
                    <ProductStatusBadge status={product.status} />
                  </div>
                </div>
                {(!verifiedToken || !verifiedToken.admin) && (
                  <AddToCartButton productId={product.id}/>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2 items-center justify-center py-4">
        {Array.from({ length: totalPages }).map((_, i) => {
          const newSearchParams = new URLSearchParams();

          if (searchParamsValues?.minPrice) {
            newSearchParams.set("minPrice", searchParamsValues.minPrice);
          }

          if (searchParamsValues?.maxPrice) {
            newSearchParams.set("maxPrice", searchParamsValues.maxPrice);
          }

          newSearchParams.set("page", `${i + 1}`);

          return (
            <Button 
              asChild={page !== i + 1} 
              disabled={page === i + 1}
              variant="outline"
              key={i}
            >
              <Link href={`/shop?${newSearchParams.toString()}`}>{i + 1}</Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default Shop