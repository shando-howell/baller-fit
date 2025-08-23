import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-sky-600">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          Already have an account?
          <Link href="/login" className="pl-1 underline">
            Login here.
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}

export default Register;