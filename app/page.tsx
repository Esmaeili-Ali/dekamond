"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen justify-center items-center flex bg-green-200">
      <Button
        variant="shadow"
        color="success"
        onPress={() => router.push("/auth")}
      >
        Auth Page
      </Button>
    </div>
  );
};

export default page;
