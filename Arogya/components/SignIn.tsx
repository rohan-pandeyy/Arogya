"use client";
import React from "react";
import { useModal } from "@/context/ModalContext";

export default function SignIn() {
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { openModal, closeModal } = useModal();

  const handleSwitchToSignUp = () => {
    closeModal();
    setTimeout(() => {
      openModal("signup");
    }, 300);               
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:80/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Failed to login");
        return;
      }

      setError(null);
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Server is not reachable");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-opensans font-semibold justify-center">
      <div className="flex items-start justify-center relative z-20">
        <div className="w-full max-w-4xl bg-green-500 border-0 rounded-3xl shadow-lg">
          <button className="absolute top-2 right-4 text-black text-xl font-bold" onClick={closeModal}>
            ×
          </button>
          <div className="text-center pt-12 pb-8">
            <h2 className="text-2xl font-specialGothic text-black">Welcome back</h2>
          </div>

          <form
            className="pt-5 px-8 pb-16 shadow-lg"
            style={{ backgroundColor: "white", borderBottomRightRadius: "24px", borderTopLeftRadius: "24px" }}
            onSubmit={onSubmit}
          >
            <div className="mb-5 font-semibold w-80">
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black placeholder:italic"
              />
            </div>

            <div className="mb-5 font-semibold w-80">
              <input
                required
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-normal w-full px-4 py-2 text-md border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black placeholder:italic"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-lg text-white bg-black rounded-lg hover:bg-white hover:text-black border border-transparent hover:border-black"
            >
              Sign In
            </button>

            {error && (
              <p className="mt-6 text-red-600 text-base text-center">{error}</p>
            )}

            <div className="mt-4 text-center text-sm font-semibold text-black">
              Don’t have an account?{' '}
              <button type="button" className="text-green-600 hover:underline" onClick={handleSwitchToSignUp}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
