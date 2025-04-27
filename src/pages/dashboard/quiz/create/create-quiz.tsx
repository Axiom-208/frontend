import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {FileText, PenLine} from "lucide-react"
import {Link} from "react-router";

export default function CreateQuizPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Create a New Quiz</h1>
                    <p className="text-muted-foreground">Choose how you want to create your quiz</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PenLine className="h-5 w-5"/>
                                Manual Creation
                            </CardTitle>
                            <CardDescription>Create a quiz by manually entering questions and answers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Build your quiz question by question with our easy-to-use form. Add multiple-choice
                                questions, set the
                                correct answers, and organize them exactly how you want.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link to="manual">Start Manual Creation</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5"/>
                                Document Upload
                            </CardTitle>
                            <CardDescription>Generate a quiz by uploading a document</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Upload a PDF or TXT file containing your questions and answers. Our system will
                                automatically parse the
                                content and generate a quiz for you.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link to="upload">Upload Document</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
