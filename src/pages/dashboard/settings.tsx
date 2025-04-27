import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"
import {Separator} from "@/components/ui/separator"
import {AlertCircle} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {useDashboardContext} from "@/context/dashboard-context.ts";
import {User} from "@/schema/user.ts";
import {toast} from "sonner";

// Define the User type
const profileFormSchema = z.object({
    firstName: z.string().min(2, {message: "First name must be at least 2 characters."}),
    lastName: z.string().min(2, {message: "Last name must be at least 2 characters."}),
    email: z.string().email({message: "Please enter a valid email address."}),
    username: z.string().min(3, {message: "Username must be at least 3 characters."}),
})

// Preferences form schema
const preferencesFormSchema = z.object({
    theme: z.enum(["light", "dark", "system"]),
    notificationEmail: z.boolean(),
    language: z.enum(["en"]),
    studyReminder: z.boolean(),
})

// Password form schema
const passwordFormSchema = z
    .object({
        currentPassword: z.string().min(8, {message: "Password must be at least 8 characters."}),
        newPassword: z.string().min(8, {message: "Password must be at least 8 characters."}),
        confirmPassword: z.string().min(8, {message: "Password must be at least 8 characters."}),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export default function SettingsPage() {
    const {user: mongoUser} = useDashboardContext()
    const [user, setUser] = useState<User>(mongoUser)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // Profile form
    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        },
    })

    // Preferences form
    const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
        resolver: zodResolver(preferencesFormSchema),
        defaultValues: {
            theme: user.preferences?.theme || "system",
            notificationEmail: user.preferences?.notificationEmail || false,
            language: user.preferences?.language || "en",
            studyReminder: user.preferences?.studyReminder || false,
        },
    })

    // Password form
    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    // Handle profile form submission
    function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
        // In a real app, you would send this data to your API
        setUser({
            ...user,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
        })
        toast.success("Profile updated", {
            description: "Your profile information has been updated successfully.",
        })
    }

    // Handle preferences form submission
    function onPreferencesSubmit(data: z.infer<typeof preferencesFormSchema>) {
        // In a real app, you would send this data to your API
        setUser({
            ...user,
            preferences: {
                ...user.preferences,
                theme: data.theme,
                notificationEmail: data.notificationEmail,
                language: data.language,
                studyReminder: data.studyReminder,
            },
        })
        toast.success("Preferences updated", {
            description: "Your preferences have been updated successfully.",
        })
    }

    // Handle password form submission
    function onPasswordSubmit(data: z.infer<typeof passwordFormSchema>) {
        // In a real app, you would send this data to your API
        console.log(data)
        toast.success("Password updated", {
            description: "Your password has been updated successfully.",
        })
        passwordForm.reset({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        })
    }

    return (
        <div className="w-full p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={profileForm.control}
                                            name="firstName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your first name" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="lastName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your last name" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={profileForm.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={profileForm.control}
                                        name="username"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your username" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save Changes</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Manage your app preferences and settings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...preferencesForm}>
                                <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
                                      className="space-y-4">
                                    <FormField
                                        control={preferencesForm.control}
                                        name="theme"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Theme</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a theme"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Choose how the app looks to you. You can match your system
                                                    preferences.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={preferencesForm.control}
                                        name="language"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Language</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a language"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="en">English</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>Choose your preferred language for the app
                                                    interface.</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={preferencesForm.control}
                                        name="notificationEmail"
                                        render={({field}) => (
                                            <FormItem
                                                className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Email Notifications</FormLabel>
                                                    <FormDescription>Receive email notifications about new content and
                                                        updates.</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={preferencesForm.control}
                                        name="studyReminder"
                                        render={({field}) => (
                                            <FormItem
                                                className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Study Reminders</FormLabel>
                                                    <FormDescription>Receive reminders to continue your learning
                                                        journey.</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save Preferences</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your current password"
                                                           type="password" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="newPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your new password"
                                                           type="password" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Confirm your new password"
                                                           type="password" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Update Password</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Management</CardTitle>
                            <CardDescription>Manage your account settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Account Status</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your account is {user.isVerify ? "verified" : "not verified"}.
                                </p>
                                {!user.isVerify && (
                                    <Button variant="outline" className="mt-2">
                                        Verify Account
                                    </Button>
                                )}
                            </div>
                            <Separator/>
                            <div>
                                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                                    Delete Account
                                </Button>
                            </div>
                            {isDeleteDialogOpen && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertTitle>Are you sure you want to delete your account?</AlertTitle>
                                    <AlertDescription>
                                        This action cannot be undone. All your data will be permanently removed.
                                        <div className="flex gap-2 mt-4">
                                            <Button variant="destructive" size="sm">
                                                Yes, delete my account
                                            </Button>
                                            <Button variant="outline" size="sm"
                                                    onClick={() => setIsDeleteDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
