export class IStudentInfo {
    id: string;
    name: string;
    age: number;
    course: string;
    feesPaid: string;
    totalFees: number; 
    feesPaidOptions?: string[];
    courses?: string[];
}

export const AVAILABLE_COURSES: string [] = [
    "B.Tech",
    "B.A Advertising",
    "B.A",
    "B.Sc",
    "B.Com",
    "B.E",
    "B.Tech"
];

export const AVAILABLE_FEES_PAID_OPTIONS: string [] = [
    "No",
    "Yes"
];