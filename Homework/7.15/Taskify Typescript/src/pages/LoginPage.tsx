import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuthContext();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await login(email, password);
    } catch (error) {
      console.log(`LoginPage: `, error);
      setError(error);
    }
  }
  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" required />
            </div>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="grid gap-4">
          {error && <p className="text-center text-sm text-red-700">{error}</p>}
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"../signup"} className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
