'use client'
import Link from "next/link"
import { useForm } from "react-hook-form";
import { useLoginMutation, useGetUserMutation } from "@/services/api/handleReqApiSlice";
import { useRouter } from "next/navigation";
import GoogleIcon from "./ui/GoogleIcon"
import { useState } from "react"
import { useActions } from "@/hooks/useActions";
import { useToast } from "@chakra-ui/react";

export const LoginForm = () => {


  const router = useRouter();
  const toast = useToast();
  const { setToken, setUserData } = useActions()
  const [error, setError] = useState();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [loginUser, { isLoading }] = useLoginMutation();
  const [getUser, { isLoading: userLoading }] = useGetUserMutation();

  const onSubmit = async (data) => {

    const { Name: userName, password } = data;

    try {

      const { data, error } = await loginUser({ userName, password });

      if (error?.status == 404) {
        setError(error.data.msg)
        debugger
      }
      if (error?.status == 403) {
        setError(error.data.msg)
      }


      if (!error) {
        setError('');
        const { accessToken } = data;

        setToken(accessToken);
        const { data: userData } = await getUser();
        const { userData: user } = userData;
        setUserData(user);
        router.push('/');
        toast({
          title: `Welcome ${user.userName}`,
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'bottom'
        })

        reset

      }

    } catch (err) {
      console.log(err)

    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="">
        <input {...register('Name', {
          required: "User Name is required field"
        })} className=" w-full text-sm  px-4 py-3 bg-slate-50 focus:bg-white border  border-gray-200 rounded-lg focus:outline-none focus:border-red-300" type="" placeholder="User Name" />
        {errors?.Name && (
          <div className="text-xs text-red-600 pl-6 pt-1 ">{errors.Name.message}</div>
        )}

      </div>


      <div className="relative" >
        <input type="password"  {...register('password', {
          required: "Password is required field"
        })} placeholder="Password" className="text-sm  px-4 py-3 rounded-lg w-full bg-slate-50 focus:bg-white border border border-gray-200 focus:outline-none focus:border-red-300" />
        {errors?.password && (
          <div className="text-xs text-red-600 pl-6 pt-1 ">{errors.password.message}</div>
        )}

      </div>

      {error ? <div className="text-base flex ml-16 text-red-600 pl-6 pt-1 ">{error}</div> : null}


      <div>
        <button type="submit" className="w-full flex justify-center bg-red-400 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
          Sign in
        </button>
      </div>
      <div className="flex items-center justify-center space-x-2 my-5">
        <span className="h-px w-16 bg-gray-100"></span>
        <span className="text-gray-300 font-normal">or</span>
        <span className="h-px w-16 bg-gray-100"></span>
      </div>

    </form  >
  )
}

