import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProducts } from "@/data/products";

export default async function ProductsTable() {
    const { data } = await getProducts();
    console.log({ data });

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
                                    <TableCell>View / Edit</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </>
    )
}