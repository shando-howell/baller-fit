import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProducts } from "@/data/products";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export default async function ProductsTable({
    page = 1
}: {
    page: number
}) {
    const { data, totalPages } = await getProducts({
        pagination: {
            page,
            pageSize: 2,
        }
    });

    return (
        <>
            {!data &&
                <h1 className="text-center text-zinc-400 py-20 font-bold text-3xl">
                    You have no products.
                </h1>
            } 
            {!!data && 
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>
                                Price
                            </TableHead>
                            <TableHead>
                                Category
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(product => {
                            return (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                    <TableCell>View / <Button asChild variant="outline" size="sm">
                                        <Link href={`/admin-dashboard/edit/${product.id}`}>
                                            <PencilIcon />
                                        </Link>
                                        </Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                {Array.from({length: totalPages}).map((_, i) => (
                                    <Button key={i} asChild variant="outline" className="mx-1">
                                        <Link href={`/admin-dashboard?page=${i + 1}`}>
                                            {i + 1}
                                        </Link>
                                    </Button>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            }
        </>
    )
}