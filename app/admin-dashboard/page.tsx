import { Breadcrumbs } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import Link from "next/link"
import ProductsTable from "./ProductsTable"

const AdminDashboard = async ({
  searchParams
}: {
  searchParams: Promise<any>
}) => {
  const searchParamsValue = await searchParams;
  console.log({searchParams});

  return (
    <div>
      <Breadcrumbs items={[{
        label: 'Dashboard',
      }]}/>
      <h1 className="text-2xl font-bold mt-3">Admin Dashboard</h1>
      <Button asChild className="inline-flex pl-2 gap-2 mt-4">
        <Link href="/admin-dashboard/new">
          <PlusCircleIcon/>New Product
        </Link>
      </Button>
      <ProductsTable page={searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1}/>
    </div>
  )
}

export default AdminDashboard