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
    preferences?: {
        theme?: "light" | "dark" | "system";
        notificationEmail?: boolean;
        language?: "en";
        studyReminder?: boolean;
    };
    courses?: string[];
    isVerify?: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export function convertToUser(user: UserResponse): User {
    return {
        id: user._id,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at),
        firstName: user.first_name,
        lastName: user.last_name,
        hashedPassword: user.hashed_password,
        email: user.email,
        username: user.username,
        isAdmin: user.is_admin,
        preferences: user.preferences
            ? {
                theme: user.preferences.theme,
                notificationEmail: user.preferences.notification_email,
                language: user.preferences.language,
                studyReminder: user.preferences.study_reminder,
            }
            : undefined,
        courses: user.courses,
        isVerify: user.is_verify,
    };
}