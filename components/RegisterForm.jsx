'use client'
import { useForm } from "react-hook-form";
import { useRegisterMutation, useGetUserMutation } from "@/services/api/handleReqApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleIcon from "./ui/GoogleIcon";
import { useActions } from "@/hooks/useActions";
import { useToast } from "@chakra-ui/react";

export const RegisterForm = () => {

  const { setToken, setUserData } = useActions();
  const router = useRouter();
  const [error, setError] = useState('');
  const [registerUser, { isLoading }] = useRegisterMutation();
  const toast = useToast();
  const [getUser, { isLoading: userLoading }] = useGetUserMutation();



  const { register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm();

  const onSubmit = async (data) => {
    const { Name: userName, Email: userEmail, password } = data;

    try {

      const { data, error } = await registerUser({ userName, userEmail, password });

      if (error?.status == 409) {
        setError(error.data.msg);
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
          title: 'Account created.',
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

  const checkPasswords = (value) => {
    if (value !== getValues('password')) {
      return 'Passwords must match'
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div className="grid grid-cols-2 gap-4">
        <div className="relative" x-data="{ show: true }">
          <input {...register('Name', {
            required: "User Name is required field"
          })}
            className=" w-full text-sm  px-4 py-3 bg-slate-50 focus:bg-white border  border-gray-200 rounded-lg focus:outline-none focus:border-red-300" type="text" placeholder="UserName" />
          {errors?.Name && (
            <div className="text-xs text-red-600 pl-6 pt-1 ">{errors.Name.message}</div>
          )}
        </div>

        <div className="relative" x-data="{ show: true }">
          <input {...register('password', {
            required: "Password is required field",
            minLength: {
              value: 8,
              message: 'Password must contain at least 8 symbols' // JS only: <p>error message</p> TS only support string
            },
          },
          )}
            placeholder="Password" type="password" className="text-sm  px-4 py-3 rounded-lg w-full bg-slate-50 focus:bg-white border border-gray-200 focus:outline-none focus:border-red-300" />
          {errors?.password && (
            <div className="text-xs text-red-600 pl-6 pt-1 ">{errors.password.message}</div>
          )}
        </div>

        <div className="relative" x-data="{ show: true }">
          <input {...register('Email', {
            required: "Email is required field",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter valid email'
            }
          })}
            placeholder="Email" className="text-sm  px-4 py-3 rounded-lg w-full bg-slate-50 focus:bg-white border border-gray-200 focus:outline-none focus:border-red-300" />
          {errors?.Email && (
            <div className="text-xs text-red-600 pl-6 pt-1 ">{errors.Email.message}</div>
          )}
        </div>

        <div className="relative" x-data="{ show: true }">
          <input {...register('repeatPassword', {
            required: "Please repeat password",
            validate: checkPasswords
            ,

          })} placeholder="Repeat Password" type="password" className="text-sm  px-4 py-3 rounded-lg w-full bg-slate-50 focus:bg-white border border-gray-200 focus:outline-none focus:border-red-300" />
          {errors?.repeatPassword && (
            <div className="text-xs text-red-600 pl-6 pt-1 ">{errors.repeatPassword.message}</div>
          )}
        </div>

      </div>

      <div className="flex items-center justify-center">
        <span className="text-red-600 ">{error}</span>

      </div>
      <div className="" >
        <button type="submit" className="w-full flex justify-center bg-red-400 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
          Sign in
        </button>
      </div>


    </form>
  )
}


