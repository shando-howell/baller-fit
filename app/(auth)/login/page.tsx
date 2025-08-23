import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "./LoginForm"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-sky-600">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          Don&apos;t have an account?
          <Link href="/register" className="pl-1 underline">Register here.</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage