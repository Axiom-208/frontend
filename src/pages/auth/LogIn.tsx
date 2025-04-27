import {Eye, EyeOff} from "lucide-react";
import {
    useState
} from "react"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import {
    Button
} from "@/components/ui/button.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"
import {
    Input
} from "@/components/ui/input.tsx"
import {Link, useNavigate} from "react-router";
import {logIn} from "@/api/auth/requests.ts";

function LogIn() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="font-semibold text-xl">
                    Welcome Back
                </h1>
                <LoginForm/>
            </div>
        </div>
    );
}


const formSchema = z.object({
    email: z.string().email({message: "Enter a valid email"}),
    password: z.string()
        .min(2, {message: "Password must be at least 2 characters"})
        .max(24, {message: "Password must be at most 24 characters"})
});

function LoginForm() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            logIn({
                email: values.email,
                password: values.password,
            }).then(() => {
                toast.success(
                    "Log in successful",
                );
                navigate("/dashboard")
            })
                .catch((error) => {
                    throw error;
                })

        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4  w-full max-w-[500px]">

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl className="">
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
                </div>

                <Button asChild variant="ghost"
                        className="w-fit p-0 text-sm hover:bg-trasparent bg-trasparent text-zinc-600">
                    <Link to="">
                        Forgot Password?
                    </Link>
                </Button>
                <Button className="w-fit" type="submit">Submit</Button>
            </form>
        </Form>
    )
}


export default LogIn;