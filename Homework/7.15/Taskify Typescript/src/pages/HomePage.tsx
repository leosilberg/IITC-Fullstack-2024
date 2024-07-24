import { Button } from "@/components/ui/button.jsx";
import { useAuthContext } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import HomeHero from "../images/home-hero.svg";
export default function HomePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="grid flex-grow grid-cols-2">
      <div className="flex items-center justify-center px-16">
        <div className="grid gap-4">
          <p>Transform Your To-Do List into Done! 🌟 </p>
          <p>
            Say goodbye to procrastination and hello to productivity with
            TaskMaster! Whether it's work, home, or personal goals, our platform
            helps you stay organized and accomplish more every day. Join now and
            experience the satisfaction of checking off your tasks with ease!
          </p>
          <p>Get Started Today Your Future Self Will Thank You!"</p>
          <div className="flex gap-8">
            {user ? (
              <Button onClick={() => navigate("/tasks")}>My Tasks</Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </Button>
                <Button onClick={() => navigate("/auth/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src={HomeHero} alt="" />
      </div>
    </div>
  );
}
