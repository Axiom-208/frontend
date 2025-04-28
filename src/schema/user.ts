export type UserResponse = {
    _id: string;
    first_name: string;
    last_name: string;
    hashed_password: string;
    email: string;
    username: string;
    is_admin?: boolean;
    preferences?: {
        theme?: "light" | "dark" | "system";
        notification_email?: boolean;
        language?: "en";
        study_reminder?: boolean;
    };
    courses?: string[];
    is_verify?: boolean;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    hashedPassword: string;
    email: string;
    username: string;
    isAdmin?: boolean;
    isDev?: boolean;
    preferences?: {
        theme?: "light" | "dark" | "system";
        notificationEmail?: boolean;
        language?: "en";
        studyReminder?: boolean;
    };
    isVerify?: boolean;
    createdAt: Date;
    updatedAt: Date;
    notes: string[];
    quizzes: string[];
    flashcards: string[];
    chapters: string[];
};

