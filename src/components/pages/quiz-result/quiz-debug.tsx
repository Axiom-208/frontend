import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

interface QuizDebugProps {
    userAnswers: string[]
    correctAnswers: string[]
}

export default function QuizDebug({userAnswers, correctAnswers}: QuizDebugProps) {
    const [showDebug, setShowDebug] = useState<boolean>(false)

    if (!showDebug) {
        return (
            <div className="mt-4 text-center">
                <Button variant="outline" size="sm" onClick={() => setShowDebug(true)}>
                    Show Debug Info
                </Button>
            </div>
        )
    }

    return (
        <Card className="mt-6 bg-slate-50">
            <CardHeader>
                <CardTitle className="text-base">Debug Information</CardTitle>
            </CardHeader>
            <CardContent className="text-xs font-mono">
                <div className="grid gap-2">
                    <div>
                        <p className="font-semibold">User Answers ({userAnswers.length}):</p>
                        <pre
                            className="bg-slate-100 p-2 rounded overflow-x-auto">{JSON.stringify(userAnswers, null, 2)}</pre>
                    </div>
                    <div>
                        <p className="font-semibold">Correct Answers ({correctAnswers.length}):</p>
                        <pre
                            className="bg-slate-100 p-2 rounded overflow-x-auto">{JSON.stringify(correctAnswers, null, 2)}</pre>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowDebug(false)}>
                    Hide Debug Info
                </Button>
            </CardContent>
        </Card>
    )
}
