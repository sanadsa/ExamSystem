export interface Question {
    ID?: number;
    Field?: String;
    QuestionType?: eQuestionType;
    Title?: String;
    Active?: boolean;
    QuestionContent?: String;
    LastUpdate?: Date;
    PossibleAnswers?: String[];
    Layout?: eAnswerLayout;
    tags?: String;
    NumOfTests: number
}

export enum eQuestionType {
    MultipleSelection,
    SingleChoice
}

export enum eAnswerLayout {
    Vertical,
    Horizontal
}
