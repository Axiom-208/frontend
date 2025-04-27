import {ParsedDocument} from "@/schema/quiz.ts";

export async function parseDocumentContent(content: string, fileType: string): Promise<ParsedDocument> {
    // This is a simplified parser for demonstration purposes
    // In a real application, you would use more sophisticated parsing logic
    // and possibly different strategies for different file types

    console.log(fileType)

    const errors: string[] = []
    let title: string | undefined
    const questions: ParsedDocument["questions"] = []

    try {
        // Simple parsing logic for text-based files
        const lines = content.split(/\r?\n/).filter((line) => line.trim() !== "")

        // Try to extract title from the first line
        if (lines.length > 0) {
            title = lines[0].trim()
        }

        // Look for patterns that might indicate questions
        let currentQuestion: {
            question: string
            options: string[]
            correctAnswer?: string
        } | null = null

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim()

            // Check if line starts with Q: or number followed by period or parenthesis
            if (line.startsWith("Q:") || /^\d+[.)]/.test(line)) {
                // If we were processing a question, save it before starting a new one
                if (currentQuestion && currentQuestion.question && currentQuestion.options.length > 0) {
                    questions.push(currentQuestion)
                }

                // Start a new question
                currentQuestion = {
                    question: line.replace(/^Q:|^\d+[.)]/, "").trim(),
                    options: [],
                }
            }
            // Check if line starts with A:, B:, C:, D: etc. or 1), 2), 3), etc.
            else if (currentQuestion && (/^[A-Z]:/.test(line) || /^\d+\)/.test(line))) {
                const option = line.replace(/^[A-Z]:|^\d+\)/, "").trim()
                currentQuestion.options.push(option)

                // Check if this option is marked as correct (e.g., with * or [correct])
                if (line.includes("*") || line.toLowerCase().includes("[correct]")) {
                    currentQuestion.correctAnswer = option
                }
            }
            // If line starts with "Answer:" or "Correct:", it might indicate the correct answer
            else if (currentQuestion && (line.startsWith("Answer:") || line.startsWith("Correct:"))) {
                const answerIndicator = line.replace(/^Answer:|^Correct:/, "").trim()

                // If it's a letter like "A" or "B", find the corresponding option
                if (/^[A-Z]$/.test(answerIndicator) && currentQuestion.options.length > 0) {
                    const index = answerIndicator.charCodeAt(0) - 65 // Convert A->0, B->1, etc.
                    if (index >= 0 && index < currentQuestion.options.length) {
                        currentQuestion.correctAnswer = currentQuestion.options[index]
                    }
                }
                // Otherwise, use the text as the correct answer
                else if (currentQuestion.options.includes(answerIndicator)) {
                    currentQuestion.correctAnswer = answerIndicator
                }
            }
                // If we have a current question but the line doesn't match any pattern,
            // it might be a continuation of the question text
            else if (currentQuestion && currentQuestion.options.length === 0) {
                currentQuestion.question += " " + line
            }
        }

        // Don't forget to add the last question
        if (currentQuestion && currentQuestion.question && currentQuestion.options.length > 0) {
            questions.push(currentQuestion)
        }

        // Add warnings if needed
        if (questions.length === 0) {
            errors.push("No questions could be extracted from the document.")
        } else {
            // Check for questions without correct answers
            const questionsWithoutCorrectAnswers = questions.filter((q) => !q.correctAnswer).length
            if (questionsWithoutCorrectAnswers > 0) {
                errors.push(`${questionsWithoutCorrectAnswers} question(s) don't have a clearly marked correct answer.`)
            }

            // Check for questions with too few options
            const questionsWithFewOptions = questions.filter((q) => q.options.length < 2).length
            if (questionsWithFewOptions > 0) {
                errors.push(`${questionsWithFewOptions} question(s) have fewer than 2 options.`)
            }
        }
    } catch {
        errors.push("Failed to parse document content. The format may not be supported.")
    }

    return {
        title,
        questions,
        errors: errors.length > 0 ? errors : undefined,
    }
}
