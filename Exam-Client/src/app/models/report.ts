export interface Report {
    ID?: number;
    TestId: number;
    UserId: number;
    DeliveryDate: Date;
    QuestionsSent: number;
    Grade: number;
    FirstName: string;
    LastName: string;
    NumOfAnswered: number;
}