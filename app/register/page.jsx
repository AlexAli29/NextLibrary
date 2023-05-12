import { RegisterForm } from "@/components/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: 'Register',
};


export default function RegisterPage() {

  return (
    <div className="flex justify-center self-center mt-4  z-10">
      <div className="p-12 bg-gradient-to-r bg-orange-50 from-orange-100  mx-auto rounded-3xl w-[35rem] ">
        <div className="mb-7 flex flex-col justify-center items-center">
          <h3 className="font-semibold text-[2.5rem] text-gray-800">Sign Up </h3>
          <p className="text-gray-400">Already have an account?
            <Link href="/login"
              className="text-sm text-red-400 hover:text-red-600"> Sign In</Link>
          </p>
        </div>
        <RegisterForm />
        <div className="mt-7 text-center text-gray-300 text-xs">
          <span>
            Copyright © 2021-2023
          </span>
        </div>
      </div>
    </div>
  )
}
