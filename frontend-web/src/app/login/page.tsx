"use client";

import Link from "next/link";
import { useState } from "react";

// next js
import { useRouter } from "next/navigation";
import axioinstance from "../../../axiosInstance";
interface PageProps {}
const Page = ({}: PageProps) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  // login

  const nav = useRouter();

  const handleLogin = async () => {
    try {
      if (!user || !password) {
        alert("Please enter username and password");
        return;
      }
      const res = await axioinstance.post("/user/login", {
        name: user,
        password: password,
      });
      if (res.data.user) {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        nav.push("/ai");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className=" min-h-screen w-full flex flex-col  items-center justify-center">
      <div className=" flex flex-col gap-4">
        <h2 className=" font-sans font-bold text-3xl">
          Login into Mealzy Health
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 p-2 rounded-md"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            nav.push("/ai");
          }}
          className=" bg-white  cursor-pointer text-black px-4 py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Page;
