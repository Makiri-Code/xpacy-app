"use client"
import { useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {  handleUserLogin, handleAdminLogin, handlePropertyOwnerLogin } from "../_lib/action";
import FormInput from "./FormInput";
import Logo from "./Logo";
import SpinnerMini from "./SpinnerMini";
import { useSearchParams } from "next/navigation";
export default function LoginForm({role}) {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl") ?? "/dashboard/user";
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    async function onSubmit(data) {
        if(role === "user"){
            startTransition(async () => {
                const response = await handleUserLogin(data, redirectUrl);
                if (response.success) toast.success(response.message);
                if (!response.success) toast.error(response.message);
                reset();
            })
        }
        if(role === "admin" || role ==="super-admin"){ 
            startTransition(async () => {
                const response = await handleAdminLogin(data, "/dashboard/admin");
                if (response.success) toast.success(response.message);
                if (!response.success) toast.error(response.message);
                reset();
            })
         }
         if(role === "property-owner"){ 
            startTransition(async () => {
                const response = await handlePropertyOwnerLogin(data, "/dashboard/property-owner");
                if (response.success) toast.success(response.message);
                if (!response.success) toast.error(response.message);
                reset();
            })
         }
    }
    return (
        <div className=" flex-1 py-16 flex justify-center px-6">
            <div className="flex flex-col gap-12">
                <div className="self-center">
                    <Logo />
                </div>
                <div className="space-y-11">
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl text-primary font-bold">Welcome back!</h1>
                        <h2 className="text-xl font-mono text-gray-500 font-semibold uppercase">
                            {role === 'property-owner' ? 'Property Owner' : role === 'admin' ? 'Admin' : 'User'} Login
                        </h2>
                        <p className="text-base text-black font-mono">Enter your email address and password to log in.</p>
                    </div>
                    <form className="space-y-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <FormInput register={register} errors={errors} label={"Email address"} id={"email"} >
                            <input {...register("email", {
                                required: "Email is required", pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Provide a valid email address",
                                }
                            })} type={"email"} name={"email"} id={"email"} placeholder={"Enter your email address"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.email ? "border-error" : "border-primary-200"}`} />
                            {errors.email && <span className="-mt-2 text-xs text-error">{errors.email.message}</span>}
                        </FormInput>
                        <FormInput label={"Password"} id={"pasword"} >
                            <input {...register("password", {
                                required: "Password is required"
                            })} type={"password"} name={"password"} id={"password"} placeholder={"Enter your password"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.email ? "border-error" : "border-primary-200"}`} />
                            {errors.password && <span className="-mt-2 text-xs text-error">{errors.password.message}</span>}
                        </FormInput>
                        <div className="flex-1 flex justify-between items-center">
                            <div className="flex items-center gap-1 font-mono -mt-2">
                                <input type="checkbox" id="checkbox" className="w-6 h-6" />
                                <label htmlFor="checkbox" className="text-base text-black">Remember me</label>
                            </div>
                            <Link href="/auth/forgot-password" className="font-mono text-base text-primary">Forgot Password?</Link>
                        </div>
                        <button type="submit" disabled={pending} className="bg-primary text-white  cursor-pointer  px-5 py-3 font-semibold flex space-x-2.5 font-mono items-center justify-center rounded-md hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"> <span>Log In</span> <span>{pending && <SpinnerMini />}</span> </button>
                    </form>
                    <p className="text-base text-black font-mono -mt-6">Don&apos;t have an account? <Link href={role === "property-owner" ? "/property-owner/sign-up" : "/auth/sign-up"} className="text-primary text-base font-bold">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}