import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useQuizStore} from "@/lib/quiz-store"
import {PlusCircle, Trash2, ArrowLeft, Save} from "lucide-react"
import {useNavigate} from "react-router-dom";
import {QuizFormData} from "@/schema/quiz.ts";
import {toast} from "sonner";

export default function ManualCreatePage() {
    const navigate = useNavigate()
    const addQuiz = useQuizStore((state) => state.addQuiz)

    const [formData, setFormData] = useState<QuizFormData>({
        title: "",
        description: "",
        category: "",
        questions: [
            {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
            },
        ],
    })

    const [activeTab, setActiveTab] = useState<string>("0")

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const updatedQuestions = [...formData.questions]
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
        }
        setFormData({...formData, questions: updatedQuestions})
    }

    const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...formData.questions]
        const updatedOptions = [...updatedQuestions[questionIndex].options]
        updatedOptions[optionIndex] = value
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            options: updatedOptions,
        }
        setFormData({...formData, questions: updatedQuestions})
    }

    const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
        const updatedQuestions = [...formData.questions]
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            correctAnswer: value,
        }
        setFormData({...formData, questions: updatedQuestions})
    }

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                {
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                },
            ],
        })
        // Set active tab to the new question
        setActiveTab(formData.questions.length.toString())
    }

    const removeQuestion = (index: number) => {
        if (formData.questions.length <= 1) {
            toast.error("Cannot remove question", {
                description: "A quiz must have at least one question.",
            })
            return
        }

        const updatedQuestions = formData.questions.filter((_, i) => i !== index)
        setFormData({...formData, questions: updatedQuestions})

        // Update active tab if necessary
        if (Number.parseInt(activeTab) >= updatedQuestions.length) {
            setActiveTab((updatedQuestions.length - 1).toString())
        }
    }

    const validateForm = (): boolean => {
        // Check title and description
        if (!formData.title.trim()) {
            toast.error("Missing title", {
                description: "Please provide a title for your quiz.",
            })
            return false
        }

        if (!formData.category.trim()) {
            toast.error("Missing category", {
                description: "Please select a category for your quiz.",
            })
            return false
        }

        // Check each question
        for (let i = 0; i < formData.questions.length; i++) {
            const q = formData.questions[i]

            if (!q.question.trim()) {
                toast.error(`Question ${i + 1} is empty`, {
                    description: "Please provide a question.",
                })
                setActiveTab(i.toString())
                return false
            }

            // Check options
            const nonEmptyOptions = q.options.filter((opt) => opt.trim() !== "")
            if (nonEmptyOptions.length < 2) {
                toast.error(`Question ${i + 1} needs more options`, {
                    description: "Please provide at least 2 answer options.",
                })
                setActiveTab(i.toString())
                return false
            }

            // Check correct answer
            if (!q.correctAnswer.trim()) {
                toast.error(`Question ${i + 1} has no correct answer`, {
                    description: "Please select a correct answer.",
                })
                setActiveTab(i.toString())
                return false
            }

            // Make sure correct answer is one of the options
            if (!q.options.includes(q.correctAnswer)) {
                toast.error(`Question ${i + 1} has invalid correct answer`, {
                    description: "The correct answer must be one of the options.",
                })
                setActiveTab(i.toString())
                return false
            }
        }

        return true
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        try {
            // Clean up empty options
            const cleanedQuestions = formData.questions.map((q) => ({
                ...q,
                options: q.options.filter((opt) => opt.trim() !== ""),
            }))

            const quizId = addQuiz({
                ...formData,
                questions: cleanedQuestions,
            })

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
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Create Quiz Manually</h1>
                    <p className="text-muted-foreground">Fill in the details below to create your custom quiz</p>
                </div>

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

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Questions</h2>
                    <Button onClick={addQuestion} variant="outline" className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4"/>
                        Add Question
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                    <TabsList className="mb-4 flex-wrap h-auto">
                        {formData.questions.map((_, index) => (
                            <TabsTrigger
                                key={index}
                                value={index.toString()}
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                Q{index + 1}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {formData.questions.map((question, questionIndex) => (
                        <TabsContent key={questionIndex} value={questionIndex.toString()}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base">Question {questionIndex + 1}</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeQuestion(questionIndex)}
                                        className="h-8 w-8 p-0 text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                        <span className="sr-only">Remove question</span>
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                                        <Textarea
                                            id={`question-${questionIndex}`}
                                            placeholder="Enter your question"
                                            value={question.question}
                                            onChange={(e) => handleQuestionChange(questionIndex, "question", e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Answer Options</Label>
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex items-center gap-2">
                                                <Input
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                                />
                                                <div className="flex-shrink-0">
                                                    <input
                                                        type="radio"
                                                        id={`correct-${questionIndex}-${optionIndex}`}
                                                        name={`correct-${questionIndex}`}
                                                        className="sr-only peer"
                                                        checked={question.correctAnswer === option && option !== ""}
                                                        onChange={() => option !== "" && handleCorrectAnswerChange(questionIndex, option)}
                                                        disabled={option === ""}
                                                    />
                                                    <Label
                                                        htmlFor={`correct-${questionIndex}-${optionIndex}`}
                                                        className="px-3 py-2 border rounded-md cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-800 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
                                                    >
                                                        Correct
                                                    </Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="flex justify-end">
                    <Button onClick={handleSubmit} className="flex items-center gap-2">
                        <Save className="h-4 w-4"/>
                        Save Quiz
                    </Button>
                </div>
            </div>
        </div>
    )
}
