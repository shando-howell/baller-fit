"use client";

import { useForm } from "react-hook-form";
import { productDataSchema } from "@/validation/productSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type Props = {
    submitButtonLabel: React.ReactNode;
    handleSubmit: (data: z.infer<typeof productDataSchema>) => void;
    defaultValues?: z.infer<typeof productDataSchema>;
}

export default function ProductForm({
    handleSubmit, 
    submitButtonLabel,
    defaultValues
}: Props) {
    const combinedDefaultValues: z.infer<typeof productDataSchema> = {
        ...{
            name: "",
            price: 0,
            stock: 0,
            brand: "",
            color: "",
            description: "",
            status: "new-arrival",
            category: "outwears",
        },
        ...defaultValues,
    }

    const form = useForm<z.infer<typeof productDataSchema>>({
        resolver: zodResolver(productDataSchema),
        defaultValues: combinedDefaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
                        <FormField control={form.control} name="status" render={({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hot">Hot</SelectItem>
                                            <SelectItem value="sale">Sale</SelectItem>
                                            <SelectItem value="new-arrival">New Arrival</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="brand" render={({field}) => (
                            <FormItem>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="price" render={({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="stock" render={({field}) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </fieldset>
                    
                    <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
                        <FormField control={form.control} name="category" render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="outwears">Outwears</SelectItem>
                                            <SelectItem value="jerseys">Jerseys</SelectItem>
                                            <SelectItem value="hats">Hats</SelectItem>
                                            <SelectItem value="accessories">Accessories</SelectItem>
                                            <SelectItem value="sneakers">Sneakers</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="color" render={({field}) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="description" render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={7} className="resize-none" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </fieldset>
                </div>
                <Button 
                    type="submit" 
                    className="max-w-md mx-auto mt-2 w-full flex gap-2"
                    disabled={form.formState.isSubmitting}
                >
                    {submitButtonLabel}
                </Button>
            </form>
        </Form>
    )
}