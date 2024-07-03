import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { AuthService } from "../services/auth.service.js";
import { useEffect } from "react";

export async function registerAction({ params, request }) {
  const formData = await request.formData();
  const { username, password, firstName, lastName } =
    Object.fromEntries(formData);
  try {
    const { message } = await AuthService.register(
      username,
      password,
      firstName,
      lastName,
    );
    console.log(`RegisterPage: `, message);
  } catch (error) {
    console.log(`RegisterPage: `, error);
    return error;
  }
}
export default function RegisterPage() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-1/3 flex-col justify-center gap-8 rounded-2xl bg-white px-16 py-12 shadow-xl">
          <h1 className="self-center text-3xl font-bold text-[#4B5563]">
            Product Market
          </h1>
          <Form method="post" className="flex flex-col gap-8">
            <Input
              label="Username"
              type="text"
              name="username"
              placeholder="User Name"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••••"
            />

            <Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="First Name"
            />

            <Input
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />

            {actionData && navigation.state == "idle" && (
              <p className="text-red-500">{actionData.error}</p>
            )}
            <Button>Sign Up</Button>
            <div className="flex justify-center gap-4 text-sm font-light text-[#6B7280]">
              <p> Already have an account?</p>
              <NavLink
                to={"/login"}
                className="font-medium text-[#63adf2] hover:underline"
              >
                Login
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
