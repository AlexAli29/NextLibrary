import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";


export const metadata = {
  title: 'Login',
};

export default function LoginPage() {



  return (
    <div className=" mt-4 min-[1700px]:mt-16 overflow-hidden flex items-center justify-center" >

      <div
        className="relative    sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl ">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">

            <h1 className="my-3 font-semibold text-4xl text-red-300">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">Lorem ipsum is placeholder text commonly used in the graphic, print,
              and publishing industries for previewing layouts and visual mockups</p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-gradient-to-r bg-orange-50 from-orange-100  mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-400">Don'thave an account?
                <Link href="/register"
                  className="text-sm text-red-400 hover:text-red-600">Sign Up</Link>
              </p>
            </div>
            <LoginForm />
            <div className="mt-7 text-center text-gray-300 text-xs">
              <span>
                Copyright © 2021-2023
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}
