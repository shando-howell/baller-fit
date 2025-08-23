"use client"

import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import registerUserSchema from "@/validation/registerUser";
import { registerUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            name: ""
        }
    })

    const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
        const response = await registerUser(data);

        if (!!response?.error) {
            toast("An error has occured");
            return
        }

        toast("Success! Your account was created successfully.")

        router.push("/login");
    };

    return (
        <>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSubmit)} 
                >
                    <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
                        <FormField control={form.control} name="name" render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Your name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Your name" />
                                    </FormControl>
                                </FormItem>
                            )
                        }}/>

                        <FormField control={form.control} name="email" render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Your email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Your email" />
                                    </FormControl>
                                </FormItem>
                            )
                        }}/>

                        <FormField control={form.control} name="password" render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Your password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Your password" type="password" />
                                    </FormControl>
                                </FormItem>
                            )
                        }}/>

                        <FormField control={form.control} name="passwordConfirm" render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Confirm password" type="password" />
                                    </FormControl>
                                </FormItem>
                            )
                        }}/>
                        <Button type="submit">Register</Button>
                        <div className="text-center">or</div>
                    </fieldset>
                </form>
                <GoogleButton />
            </Form>
        </>
    )
}

export default RegisterForm