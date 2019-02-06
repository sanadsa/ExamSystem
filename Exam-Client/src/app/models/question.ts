export class Question {
    constructor(
    public ID: number,
    public Field: String,
    public Type: eQuestionType,
    public Text: String,
    public TextBelow: String,
    public PossibleAnswers: String[],
    public AnswerLayout: eAnswerLayout,
    public LastUpdate: Date,
    public Tags: String[]
    ){}
}
// export interface Question {
//     ID: number;
//     Field: String;
//     Type: eQuestionType;
//     Text: String;
//     TextBelow: String;
//     PossibleAnswers: String[];
//     AnswerLayout: eAnswerLayout;
//     Tags: String[];
// }

export enum eQuestionType {
    MultipleSelection,
    SingleChoice
}

export enum eAnswerLayout {
    Vertical,
    Horizontal
}
