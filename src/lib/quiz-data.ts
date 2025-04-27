import {Quiz} from "@/schema/quiz.ts";

export const quizData: Quiz[] = [
    {
        id: "math-basics",
        title: "Math Basics",
        description: "Test your knowledge of basic mathematics concepts",
        questions: [
            {
                question: "What is the result of 7 × 8?",
                options: ["54", "56", "64", "72"],
                correctAnswer: "56",
            },
            {
                question: "What is the square root of 144?",
                options: ["12", "14", "16", "18"],
                correctAnswer: "12",
            },
            {
                question: "If x + 5 = 12, what is the value of x?",
                options: ["5", "7", "8", "17"],
                correctAnswer: "7",
            },
            {
                question: "What is 1/4 of 100?",
                options: ["4", "25", "40", "75"],
                correctAnswer: "25",
            },
            {
                question: "What is the perimeter of a square with sides of length 5 units?",
                options: ["10 units", "15 units", "20 units", "25 units"],
                correctAnswer: "20 units",
            },
            {
                question: "Which of the following is a prime number?",
                options: ["1", "15", "23", "49"],
                correctAnswer: "23",
            },
            {
                question: "What is the value of π (pi) rounded to two decimal places?",
                options: ["3.12", "3.14", "3.16", "3.18"],
                correctAnswer: "3.14",
            },
            {
                question: "What is the result of 15% of 80?",
                options: ["8", "12", "15", "20"],
                correctAnswer: "12",
            },
            {
                question: "If a triangle has angles of 30° and 60°, what is the measure of the third angle?",
                options: ["30°", "60°", "90°", "120°"],
                correctAnswer: "90°",
            },
            {
                question: "What is the least common multiple (LCM) of 6 and 8?",
                options: ["12", "24", "36", "48"],
                correctAnswer: "24",
            },
        ],
    },
    {
        id: "science-fundamentals",
        title: "Science Fundamentals",
        description: "Test your knowledge of basic science concepts",
        questions: [
            {
                question: "What is the chemical symbol for water?",
                options: ["WA", "H2O", "HO2", "W"],
                correctAnswer: "H2O",
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Jupiter", "Mars", "Saturn"],
                correctAnswer: "Mars",
            },
            {
                question: "What is the largest organ in the human body?",
                options: ["Heart", "Liver", "Brain", "Skin"],
                correctAnswer: "Skin",
            },
            {
                question: "What is the process by which plants make their own food using sunlight?",
                options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
                correctAnswer: "Photosynthesis",
            },
            {
                question: "What is the unit of electric current?",
                options: ["Volt", "Watt", "Ampere", "Ohm"],
                correctAnswer: "Ampere",
            },
            {
                question: "Which of the following is NOT a state of matter?",
                options: ["Solid", "Liquid", "Gas", "Energy"],
                correctAnswer: "Energy",
            },
            {
                question: "What is the closest star to Earth?",
                options: ["Proxima Centauri", "Alpha Centauri", "Polaris", "The Sun"],
                correctAnswer: "The Sun",
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                correctAnswer: "Oxygen",
            },
            {
                question: "What is the speed of light in a vacuum?",
                options: ["300,000 km/s", "150,000 km/s", "3,000 km/s", "30,000 km/s"],
                correctAnswer: "300,000 km/s",
            },
            {
                question: "Which of these is NOT one of Newton's Laws of Motion?",
                options: ["Law of Inertia", "Law of Acceleration", "Law of Action and Reaction", "Law of Gravity"],
                correctAnswer: "Law of Gravity",
            },
        ],
    },
    {
        id: "world-history",
        title: "World History",
        description: "Test your knowledge of important historical events",
        questions: [
            {
                question: "In which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                correctAnswer: "1945",
            },
            {
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                correctAnswer: "George Washington",
            },
            {
                question: "Which ancient civilization built the pyramids at Giza?",
                options: ["Mesopotamians", "Greeks", "Romans", "Egyptians"],
                correctAnswer: "Egyptians",
            },
            {
                question: "The Renaissance period began in which country?",
                options: ["France", "England", "Italy", "Germany"],
                correctAnswer: "Italy",
            },
            {
                question: "When did the French Revolution begin?",
                options: ["1689", "1776", "1789", "1804"],
                correctAnswer: "1789",
            },
            {
                question: "Who was the leader of the Soviet Union during most of World War II?",
                options: ["Vladimir Lenin", "Joseph Stalin", "Leon Trotsky", "Nikita Khrushchev"],
                correctAnswer: "Joseph Stalin",
            },
            {
                question: "The Industrial Revolution began in which country?",
                options: ["United States", "France", "Germany", "Great Britain"],
                correctAnswer: "Great Britain",
            },
            {
                question: "Which explorer is credited with discovering America in 1492?",
                options: ["Ferdinand Magellan", "Vasco da Gama", "Christopher Columbus", "Amerigo Vespucci"],
                correctAnswer: "Christopher Columbus",
            },
            {
                question: "The Berlin Wall fell in which year?",
                options: ["1985", "1989", "1991", "1993"],
                correctAnswer: "1989",
            },
            {
                question: "Which empire was ruled by Genghis Khan in the 13th century?",
                options: ["Ottoman Empire", "Roman Empire", "Mongol Empire", "Persian Empire"],
                correctAnswer: "Mongol Empire",
            },
        ],
    },
]
