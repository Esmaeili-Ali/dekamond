"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

export default function DashboardPage() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    router.replace("/auth");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-10 justify-center items-center bg-green-500">
      <h1 className="text-white text-3xl font-bold">
        Welcome to the Dashboard
      </h1>
      <Button color="danger" variant="shadow" onPress={handleLogout}>
        Clear Storage
      </Button>
    </div>
  );
}
