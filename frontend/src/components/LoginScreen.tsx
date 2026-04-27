import { useEffect } from "react";
import { getUser, loginUser } from "../utils";

export function LoginScreen({
  setCurrentScreen,
}: {
  setCurrentScreen: (screen: string) => void;
}) {
  useEffect(() => {
    getUser();
  }, []);

  const handleAction = async (formData: FormData) => {
    console.log(
      "form submitted",
      formData.get("email"),
      formData.get("password"),
    );
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email === "string" && typeof password === "string") {
      const result = await loginUser({
        email,
        password,
      });
      if (result.success) {
        setCurrentScreen("home_screen");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3>Login page</h3>
      <section className="">
        <form action={handleAction} className="flex flex-col gap-4">
          <input
            className="border-2 rounded border-gray-400"
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            className="border-2 rounded border-gray-400"
            type="password"
            placeholder="password"
            name="password"
          />
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
        <div></div>
      </section>
    </div>
  );
}
