import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useUserContext } from "../contexts/UserContext.jsx";

export default function LoginPage() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const success = await login(
      formData.get("username"),
      formData.get("password"),
    );
    if (success) {
      navigate("/user", { replace: true });
    }
  }
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-1/3 flex-col justify-center gap-8 rounded-2xl bg-white px-16 py-12 shadow-xl">
          <h1 className="self-center text-3xl font-bold text-[#4B5563]">
            Product Market
          </h1>
          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <Input
              label="User Name"
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

            <Button>Login </Button>

            <div className="flex justify-center gap-4 text-sm font-light text-[#6B7280]">
              <p> Don't have an accout yet?</p>
              <NavLink
                to={"/register"}
                className="font-medium text-[#63adf2] hover:underline"
              >
                Register
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
