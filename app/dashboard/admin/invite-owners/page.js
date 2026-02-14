"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPaperPlane, FaUserPlus } from "react-icons/fa6";
import { invitePropertyOwner } from "@/app/_lib/action";
import FormInput from "@/app/_components/FormInput";
import SpinnerMini from "@/app/_components/SpinnerMini";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("message", data.message);

        startTransition(async () => {
            try {
                const res = await invitePropertyOwner(formData);
                if (res.success) {
                    toast.success(res.message || "Invitation sent successfully!");
                    reset();
                } else {
                    toast.error(res.message || "Failed to send invitation.");
                }
            } catch (error) {
                toast.error("An error occurred while sending the invitation.");
                console.error(error);
            }
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                    <FaUserPlus className="text-2xl" />
                    Invite Property Owner
                </h1>
                <p className="text-gray-600 mt-2">Send an email invitation to potential property owners to join the platform.</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Full Name" id="name" error={errors.name?.message}>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                id="name"
                                placeholder="e.g. John Doe"
                                className={`w-full rounded-lg border bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-red-500" : "border-gray-200"}`}
                            />
                        </FormInput>

                        <FormInput label="Email Address" id="email" error={errors.email?.message}>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                id="email"
                                placeholder="e.g. john@example.com"
                                className={`w-full rounded-lg border bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                            />
                        </FormInput>
                    </div>

                    <FormInput label="Invitation Message" id="message">
                        <textarea
                            {...register("message")}
                            id="message"
                            rows={6}
                            placeholder="Writes a custom message..."
                            defaultValue="You have been invited to join Xpacy as a property owner. Please sign up to manage your properties and grow your business with us."
                            className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 border-gray-200 resize-none"
                        />
                        <p className="text-xs text-gray-400 mt-1 text-right">A default message is provided.</p>
                    </FormInput>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? <SpinnerMini /> : <FaPaperPlane />}
                            {isPending ? "Sending..." : "Send Invitation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
