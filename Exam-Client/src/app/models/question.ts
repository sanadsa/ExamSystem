export interface Question {
    ID?: number;
    Field: String;
    QuestionType: eQuestionType;
    Title: String;
    QuestionContent: String;
    LastUpdate: Date;
    PossibleAnswers: String[];
    Layout: eAnswerLayout;
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
