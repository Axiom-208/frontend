import * as z from "zod";
import {ComponentPropsWithoutRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Eye, EyeOff} from "lucide-react";
import {register} from "@/api/auth/requests.ts";
import {useNavigate} from "react-router";
import {cn} from "@/lib/utils.ts";


function SignUp() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="font-semibold text-xl mt-8">
                    Create Account
                </h1>
                <SignupForm/>
            </div>
        </div>
    );
}

const formSchema = z.object({
    firstName: z.string()
        .min(3, {message: "First name must be at least 3 characters"})
        .max(20, {message: "First name must be at most 20 characters"})
        .regex(/^[A-Za-z]+$/, {message: "First name must contain only letters"}),

    lastName: z.string()
        .min(2, {message: "Last name must be at least 2 characters"})
        .max(20, {message: "Last name must be at most 20 characters"})
        .regex(/^[A-Za-z]+$/, {message: "Last name must contain only letters"}),

    username: z.string()
        .min(8, {message: "Username must be at least 8 characters"})
        .max(16, {message: "Username must be at most 16 characters"}),

    email: z.string()
        .email({message: "Enter a valid email"}),

    password: z.string()
        .min(12, {message: "Password must have 12-24 characters"})
        .max(24, {message: "Password must have 12-24 characters"})
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least one special character and one number",
        }),

    confirmPassword: z.string()
        .min(12, {message: "Confirm Password must have 12-24 characters"})
        .max(24, {message: "Confirm Password must have 12-24 characters"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


function SignupForm({
                        className,
                        ...props
                    }: ComponentPropsWithoutRef<"form">) {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        const {email, password, firstName, lastName, username} = values;
        try {
            register({email, password, firstName, lastName, username}).then(() => {
                toast.success("Account successfully created!");
                navigate("/dashboard");
            });
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }


    return (
        <Form {...form}>
            <form
                {...props}
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("space-y-4 w-full max-w-[500px] my-10", className)}
            >

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doe"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                </div>


                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="johndoe"
                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="johndoe@mail.com"
                                    type="email"
                                    {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="******"
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 w-fit h-fit pr-2 transform -translate-y-1/2 hover:bg-white cursor-pointer"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="******"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 w-fit h-fit pr-2 transform -translate-y-1/2 hover:bg-white cursor-pointer"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default SignUp;