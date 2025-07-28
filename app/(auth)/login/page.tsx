import GoogleButton from "@/components/GoogleButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const LoginPage = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage