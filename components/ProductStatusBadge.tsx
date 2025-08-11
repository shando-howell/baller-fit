import { ProductStatus } from "@/types/productStatus";
import { Badge } from "./ui/badge";

const statusLabel = {
    hot: "Hot",
    sale: "Sale",
    "new-arrival": "New Arrival",
}

const variant: {[key: string]: "destructive" | "primary" | "success"} = {
    hot: "destructive",
    sale: "primary",
    "new-arrival": "success",
}

export default function ProductStatusBadge({
    status,
    className
}: {
    status: ProductStatus;
    className?: string;
}) {
    const label = statusLabel[status];
    return (
        <Badge variant={variant[status]} className={className}>
            {label}
        </Badge>
    )
}