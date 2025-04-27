import {useState, useEffect} from "react"
import {useNavigate, useSearchParams, Link, useParams} from "react-router"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {quizData} from "@/lib/quiz-data"
import {Question, Quiz, QuizResult} from "@/schema/quiz.ts";
import QuizDebug from "@/components/pages/quiz-result/quiz-debug.tsx";


export default function ResultsPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {quizId} = useParams() as unknown as { quizId: string };

    const [quiz, setQuiz] = useState<Quiz | null>(null)
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [score, setScore] = useState<QuizResult>({correct: 0, total: 0})

    useEffect(() => {
        const currentQuiz = quizData.find((q) => q.id === quizId)
        if (!currentQuiz) {
            navigate("/categories")
            return
        }

        const answers = searchParams.get("answers")
        if (!answers) {
            navigate(`/quiz/${quizId}`)
            return
        }

        const answerArray = answers.split(",")
        setQuiz(currentQuiz)
        setUserAnswers(answerArray)

        // Calculate score - ensure we only count up to the number of questions
        let correctCount = 0
        const answersToCheck = Math.min(answerArray.length, currentQuiz.questions.length)

        for (let i = 0; i < answersToCheck; i++) {
            if (currentQuiz.questions[i].correctAnswer === answerArray[i]) {
                correctCount++
            }
        }

        setScore({
            correct: correctCount,
            total: currentQuiz.questions.length,
        })
    }, [quizId, navigate, searchParams])

    if (!quiz) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <p>Loading results...</p>
            </div>
        )
    }

    const percentage: number = Math.round((score.correct / score.total) * 100)

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Quiz Results: {quiz.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-6">
                            <div
                                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 mb-4">
                                <span className="text-3xl font-bold">{percentage}%</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                You scored {score.correct} out of {score.total}
                            </h3>
                            <p className="text-muted-foreground">
                                {percentage >= 80
                                    ? "Excellent work! You've mastered this topic."
                                    : percentage >= 60
                                        ? "Good job! You're on the right track."
                                        : "Keep practicing to improve your score."}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between flex-wrap gap-4">
                        <Button asChild variant="outline">
                            <Link to={`/quiz/${quizId}`}>Retry Quiz</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/categories">Browse More Quizzes</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <h2 className="text-xl font-semibold mb-4">Review Your Answers</h2>
                <div className="space-y-4">
                    {quiz.questions.map((question: Question, index: number) => {
                        const userAnswer = userAnswers[index] || "No answer"
                        const isCorrect = question.correctAnswer === userAnswer

                        return (
                            <Card key={index}
                                  className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}>
                                <CardHeader>
                                    <CardTitle className="text-base">Question {index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p>{question.question}</p>
                                    <div className="grid gap-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Your answer:</span>
                                            <span
                                                className={isCorrect ? "text-green-600" : "text-red-600"}>{userAnswer}</span>
                                        </div>
                                        {!isCorrect && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Correct answer:</span>
                                                <span className="text-green-600">{question.correctAnswer}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Debug component to verify answers are tracked correctly */}
                <QuizDebug userAnswers={userAnswers} correctAnswers={quiz.questions.map((q) => q.correctAnswer)}/>
            </div>
        </div>
    )
}
