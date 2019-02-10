export class ConstantFields {
    // words
    SingleChoice: String;
    // services
    getQuestions: string;
    addQuestion: string;

    constructor() {
        // words
        this.SingleChoice = 'SingleChoice';
        // services
        this.addQuestion = 'http://localhost:8000/apiQuestion/createQuestion';
        this.getQuestions = 'http://localhost:8000/apiQuestion/getQuestions/';
    }
}