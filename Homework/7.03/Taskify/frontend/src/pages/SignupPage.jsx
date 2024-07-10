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
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const { register } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, email, password, firstName, lastName } =
      Object.fromEntries(formData);
    try {
      await register(username, email, password, firstName, lastName);
      navigate("../login");
    } catch (error) {
      console.log(`LoginPage: `, error);
      setError(error);
    }
  }
  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input name="firstName" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input name="lastName" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Username</Label>
              <Input name="username" placeholder="MaxRob" required />
            </div>
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
              <Input name="password" type="password" />
            </div>
            <Button className="w-full">Create an account</Button>
          </form>
        </CardContent>
        <CardFooter className="grid gap-4">
          {error && <p className="text-center text-sm text-red-700">{error}</p>}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to={"../login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
