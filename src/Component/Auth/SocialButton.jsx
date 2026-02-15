"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export const SocialButtons = () => {
  const router = useRouter();
  const handleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "/allProducts",
    });
    console.log(result);

    if (result.ok) {
      Swal.fire("Success", "Welcome", "Success");
      router.push("/allProducts");
    } else {
      Swal.fire("Error", "Login Failed", "Error");
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="btn btn-outline btn-error flex-1"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};
