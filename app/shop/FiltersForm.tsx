"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    // category: z.string().optional()
})

export default function FiltersForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: searchParams.get("minPrice") ?? "",
            maxPrice: searchParams.get("maxPrice") ?? "",
            // category: searchParams.get("category") ?? "",
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log({ data });
        const newSearchParams = new URLSearchParams();

        if(data.minPrice) {
            newSearchParams.set("minPrice", data.minPrice);
        }

        if(data.maxPrice) {
            newSearchParams.set("maxPrice", data.maxPrice);
        }
        
        // if(data.category) {
        //     newSearchParams.set("category", data.category);
        // }

        newSearchParams.set("page", "1");
        router.push(`/shop?${newSearchParams.toString()}`)
    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(handleSubmit)} 
                className="grid grid-cols-4 gap-2"
            >
                <FormField control={form.control} name="minPrice" render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Min price" type="number" min={0}/>
                        </FormControl>
                    </FormItem>
                )} />

                <FormField control={form.control} name="maxPrice" render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Max price" type="number" min={0}/>
                        </FormControl>
                    </FormItem>
                )} />

                {/* <FormField control={form.control} name="category" render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category"/>
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
                    </FormItem>
                )}/> */}

                <Button type="submit">
                    Search
                </Button>
            </form>
        </Form>
    )
}