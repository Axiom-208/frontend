import {useState, useEffect, JSX} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {quizData} from "@/lib/quiz-data"
import type {Quiz, Question} from "@/schema/quiz.ts"
import {useNavigate, useParams} from "react-router";


export default function QuizPage(): JSX.Element {
    const navigate = useNavigate()
    const {quizId} = useParams() as unknown as { quizId: string };

    const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [userAnswers, setUserAnswers] = useState<string[]>([])

    useEffect(() => {
        const quiz = quizData.find((q) => q.id === quizId)
        if (quiz) {
            setCurrentQuiz(quiz)
        } else {
            navigate("/dashboard")
        }
    }, [quizId, navigate])

    if (!currentQuiz) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <p>Loading quiz...</p>
            </div>
        )
    }

    const currentQuestion: Question = currentQuiz.questions[currentQuestionIndex]
    const progress: number = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100

    const handleAnswerSelect = (answer: string): void => {
        if (isAnswered) return
        setSelectedAnswer(answer)
        setIsAnswered(true)
    }

    const handleNextQuestion = (): void => {
        // Add current answer to the userAnswers array
        const updatedAnswers = [...userAnswers, selectedAnswer || ""]
        setUserAnswers(updatedAnswers)

        if (currentQuestionIndex < currentQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswer(null)
            setIsAnswered(false)
        } else {
            // Quiz completed, navigate to results with all answers
            navigate(`results?answers=${updatedAnswers.join(",")}`)
        }
    }

    const isCorrect: boolean = selectedAnswer === currentQuestion.correctAnswer

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">{currentQuiz.title}</h1>
                    <div className="flex items-center gap-4">
                        <Progress value={progress} className="h-2"/>
                        <span className="text-sm whitespace-nowrap">
              {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </span>
                    </div>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {currentQuestion.options.map((option: string) => (
                            <div
                                key={option}
                                onClick={() => handleAnswerSelect(option)}
                                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                    selectedAnswer === option
                                        ? isAnswered
                                            ? isCorrect
                                                ? "bg-green-100 border-green-500"
                                                : "bg-red-100 border-red-500"
                                            : "bg-gray-100 border-gray-300"
                                        : isAnswered && option === currentQuestion.correctAnswer
                                            ? "bg-green-100 border-green-500"
                                            : "hover:bg-gray-50"
                                }`}
                            >
                                {option}
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleNextQuestion} disabled={!isAnswered} className="w-full">
                            {currentQuestionIndex < currentQuiz.questions.length - 1 ? "Next Question" : "See Results"}
                        </Button>
                    </CardFooter>
                </Card>

                {isAnswered && (
                    <div
                        className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                        <p className="font-medium">{isCorrect ? "Correct!" : "Incorrect!"}</p>
                        <p className="text-sm mt-1">
                            {isCorrect
                                ? "Great job! You selected the right answer."
                                : `The correct answer is: ${currentQuestion.correctAnswer}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
