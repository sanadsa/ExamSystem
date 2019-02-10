export interface Question {
    Id?: number;
    Field: String;
    QuestionType: eQuestionType;
    Title: String;
    QuestionContent: String;
    LastUpdate: Date;
    PossibleAnswers: String[];
    AnswerLayout: eAnswerLayout;
    Tags: String[];
}

export enum eQuestionType {
    MultipleSelection,
    SingleChoice
}

export enum eAnswerLayout {
    Vertical,
    Horizontal
}
