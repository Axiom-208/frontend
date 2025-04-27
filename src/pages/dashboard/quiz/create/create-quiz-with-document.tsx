import {useState, useRef} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useQuizStore} from "@/lib/quiz-store"
import {ArrowLeft, Upload, FileText, AlertCircle, Check, Loader2} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {parseDocumentContent} from "@/lib/document-parser"
import type React from "react"
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {ParsedDocument, QuizFormData} from "@/schema/quiz.ts";

export default function UploadCreatePage() {
    const navigate = useNavigate()
    const addQuiz = useQuizStore((state) => state.addQuiz)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const [parsedDocument, setParsedDocument] = useState<ParsedDocument | null>(null)
    const [errors, setErrors] = useState<string[]>([])

    const [formData, setFormData] = useState<QuizFormData>({
        title: "",
        description: "",
        category: "",
        questions: [],
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        // Check file type
        const fileType = selectedFile.type
        if (fileType !== "application/pdf" && fileType !== "text/plain" && !fileType.includes("document")) {
            toast.error("Invalid file type", {
                description: "Please upload a PDF or TXT file.",
            })
            return
        }

        setFile(selectedFile)
        setIsUploading(true)

        try {
            // In a real app, you might upload the file to a server here
            // For this example, we'll simulate a brief upload delay
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsUploading(false)
            setIsProcessing(true)

            // Read and parse the file
            const fileContent = await readFileContent(selectedFile)
            const parsed = await parseDocumentContent(fileContent, selectedFile.type)

            setParsedDocument(parsed)
            setErrors(parsed.errors || [])

            // Update form with parsed data
            setFormData({
                ...formData,
                title: parsed.title || formData.title,
                questions: parsed.questions.map((q) => ({
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer || q.options[0], // Default to first option if not specified
                })),
            })

            setIsProcessing(false)

            if (parsed.errors && parsed.errors.length > 0) {
                toast.warning("Document parsed with warnings", {
                    description: "Some issues were found. Please review the parsed content.",
                })
            } else {
                toast.success("Document parsed successfully", {
                    description: `${parsed.questions.length} questions extracted.`,
                })
            }
        } catch {
            setIsUploading(false)
            setIsProcessing(false)
            toast.error("Error processing file", {
                description: "There was a problem parsing your document. Please try again or use manual creation.",
            })
        }
    }

    const readFileContent = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                if (event.target?.result) {
                    resolve(event.target.result as string)
                } else {
                    reject(new Error("Failed to read file"))
                }
            }

            reader.onerror = () => {
                reject(new Error("File read error"))
            }

            if (file.type === "application/pdf") {
                // In a real app, you would use a PDF parsing library
                // For this example, we'll just read as text
                reader.readAsText(file)
            } else {
                reader.readAsText(file)
            }
        })
    }

    const handleSubmit = () => {
        if (!formData.title.trim()) {
            toast.error("Missing title", {
                description: "Please provide a title for your quiz.",
            })
            return
        }

        if (!formData.category.trim()) {
            toast("Missing category", {
                description: "Please select a category for your quiz.",
            })
            return
        }

        if (formData.questions.length === 0) {
            toast.error("No questions", {
                description: "Your quiz must have at least one question.",
            })
            return
        }

        try {
            const quizId = addQuiz(formData)

            toast.success("Quiz created successfully!", {
                description: "Your quiz has been saved and is now available to take.",
            })

            // Redirect to the quiz page
            navigate(`/dashboard/quiz/${quizId}`)
        } catch {
            toast.error("Error creating quiz", {
                description: "There was a problem saving your quiz. Please try again.",
            })
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <Button variant="ghost" className="mb-6 flex items-center gap-2"
                        onClick={() => navigate("/dashboard/quiz/create")}>
                    <ArrowLeft className="h-4 w-4"/>
                    Back to Creation Options
                </Button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Create Quiz from Document</h1>
                    <p className="text-muted-foreground">
                        Upload a document containing questions and answers to automatically generate a quiz
                    </p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Upload Document</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div
                                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf,.txt,.doc,.docx"
                                    onChange={handleFileChange}
                                    disabled={isUploading || isProcessing}
                                />

                                {!file ? (
                                    <div className="space-y-2">
                                        <Upload className="h-8 w-8 mx-auto text-gray-400"/>
                                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PDF or TXT (max 10MB)</p>
                                    </div>
                                ) : isUploading ? (
                                    <div className="space-y-2">
                                        <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary"/>
                                        <p className="text-sm font-medium">Uploading file...</p>
                                    </div>
                                ) : isProcessing ? (
                                    <div className="space-y-2">
                                        <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary"/>
                                        <p className="text-sm font-medium">Processing document...</p>
                                        <p className="text-xs text-muted-foreground">Extracting questions and
                                            answers</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <FileText className="h-8 w-8 mx-auto text-green-500"/>
                                        <p className="text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <Check className="h-3 w-3"/>
                                            Document processed
                                        </p>
                                    </div>
                                )}
                            </div>

                            {errors.length > 0 && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertTitle>Processing Warnings</AlertTitle>
                                    <AlertDescription>
                                        <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {parsedDocument && (
                    <>
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Quiz Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Quiz Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter a title for your quiz"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe what your quiz is about"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({...formData, category: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mathematics">Mathematics</SelectItem>
                                            <SelectItem value="science">Science</SelectItem>
                                            <SelectItem value="history">History</SelectItem>
                                            <SelectItem value="language">Language Arts</SelectItem>
                                            <SelectItem value="geography">Geography</SelectItem>
                                            <SelectItem value="arts">Arts & Culture</SelectItem>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Extracted Questions</h2>
                            <p className="text-sm text-muted-foreground">
                                Review and edit the questions extracted from your document
                            </p>
                        </div>

                        {formData.questions.map((question, questionIndex) => (
                            <Card key={questionIndex} className="mb-4">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Question {questionIndex + 1}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                                        <Textarea
                                            id={`question-${questionIndex}`}
                                            value={question.question}
                                            onChange={(e) => {
                                                const updatedQuestions = [...formData.questions]
                                                updatedQuestions[questionIndex] = {
                                                    ...updatedQuestions[questionIndex],
                                                    question: e.target.value,
                                                }
                                                setFormData({...formData, questions: updatedQuestions})
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Answer Options</Label>
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex items-center gap-2">
                                                <Input
                                                    value={option}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...formData.questions]
                                                        const updatedOptions = [...updatedQuestions[questionIndex].options]
                                                        updatedOptions[optionIndex] = e.target.value
                                                        updatedQuestions[questionIndex] = {
                                                            ...updatedQuestions[questionIndex],
                                                            options: updatedOptions,
                                                        }
                                                        setFormData({...formData, questions: updatedQuestions})
                                                    }}
                                                />
                                                <div className="flex-shrink-0">
                                                    <input
                                                        type="radio"
                                                        id={`correct-${questionIndex}-${optionIndex}`}
                                                        name={`correct-${questionIndex}`}
                                                        className="sr-only peer"
                                                        checked={question.correctAnswer === option}
                                                        onChange={() => {
                                                            const updatedQuestions = [...formData.questions]
                                                            updatedQuestions[questionIndex] = {
                                                                ...updatedQuestions[questionIndex],
                                                                correctAnswer: option,
                                                            }
                                                            setFormData({...formData, questions: updatedQuestions})
                                                        }}
                                                    />
                                                    <Label
                                                        htmlFor={`correct-${questionIndex}-${optionIndex}`}
                                                        className="px-3 py-2 border rounded-md cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-800"
                                                    >
                                                        Correct
                                                    </Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <div className="flex justify-end">
                            <Button onClick={handleSubmit} className="flex items-center gap-2">
                                Save Quiz
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
