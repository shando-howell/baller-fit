import ProductStatusBadge from "@/components/ProductStatusBadge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getProductById } from "@/data/products";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import BackButton from "./BackButton";

const ProductPage = async ({params}: {
    params: Promise<any>
}) => {
    const paramsValue = await params;
    const product = await getProductById(paramsValue.productId);

    return (
        <>
            <header className="grid grid-cols-[1fr_500px]">
                <div>
                    <Carousel className="w-full">
                        <CarouselContent>
                            <CarouselItem>
                                <div className="relative h-[80vh] min-h-80">
                                    <Image
                                        src="/images/Sneaker-Placeholder.jpg"
                                        alt="Placeholder image"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                    {/* {!!product.images && 
                        <Carousel className="w-full">
                            <CarouselContent>
                                {product.images.map((image, index) => (
                                    <CarouselItem key={image}>
                                        <div className="relative h-[80vh] min-h-80">
                                            <Image 
                                                src={} 
                                                alt={`Image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {product.images.length > 1 && (
                                <>
                                    <CarouselPrevious className="translate-x-24 size-12"/>
                                    <CarouselNext className="-translate-x-24 size-12"/>
                                </>
                            )}
                        </Carousel>
                    } */}
                    <div className="max-w-screen-md mx-auto py-8 px-3">
                        <BackButton/>
                        <ReactMarkdown>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                </div>
                <div className="bg-sky-200 h-screen p-8 sticky top-0 grid place-items-center">
                    <div className="flex flex-col gap-10 w-full">
                        <ProductStatusBadge status={product.status} className="mr-auto text-base"/>
                        <h1 className="text-4xl font-semibold">
                            {product.name}
                        </h1>
                        <h2 className="text-3xl font-light">
                            ${numeral(product.price).format("0,0")}
                        </h2>
                        <div className="flex gap-8">
                            <div className="flex gap-2">
                                {product.brand}
                            </div>
                            <div className="flex gap-2">
                                {product.stock} In Stock
                            </div>
                        </div>
                        <div>
                            <Button>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default ProductPage;