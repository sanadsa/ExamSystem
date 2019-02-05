export interface Question {
    Field: String;
    Type: eQuestionType;
    Text: String;
    TextBelow: String;
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
