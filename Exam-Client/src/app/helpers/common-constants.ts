export class ConstantFields {
    // words
    SingleChoice: string;
    category: string;
    // services
    getQuestions: string;
    addQuestion: string;
    questionsListRoute: string;
    editQuestionRoute: string;
    addQuestionRoute: string;

    constructor() {
        // words
        this.SingleChoice = 'SingleChoice';
        this.category = 'category';
        // services
        this.addQuestion = 'http://localhost:8000/api/Question/createQuestion';
        this.getQuestions = 'http://localhost:8000/api/Question/getQuestions/';
        // routes
        this.questionsListRoute = '/questionList';
        this.editQuestionRoute = '/editQuestion';
        this.addQuestionRoute = '/addQuestion';
    }
}