export class ConstantFields {
    // words
    SingleChoice: string;
    MultipleSelection: string;
    category: string;
    Horizontal: string;
    Vertical: string;
    // services
    getQuestions: string;
    getAnswers: string;
    addQuestion: string;
    deleteQuestion: string;
    addAnswer: string;
    // rooutes
    questionsListRoute: string;
    editQuestionRoute: string;
    addQuestionRoute: string;
    mainMenu: string;

    constructor() {
        // words
        this.SingleChoice = 'SingleChoice';
        this.MultipleSelection = 'MultipleSelection';
        this.category = 'field';
        this.Vertical = 'Vertical';
        this.Horizontal = 'Horizontal';
        // services
        this.addQuestion = 'http://localhost:8000/api/Question/createQuestion';
        this.getQuestions = 'http://localhost:8000/api/Question/getQuestions/';
        this.deleteQuestion = 'http://localhost:8000/api/Question/deleteQuestion/';
        this.getAnswers = 'http://localhost:8000/api/Question/getAnswers/';
        this.addAnswer = 'http://localhost:8000/api/Question/createAnswer';
        // routes
        this.questionsListRoute = '/questionList';
        this.editQuestionRoute = '/editQuestion';
        this.addQuestionRoute = '/addQuestion';
        this.mainMenu = '/mainmenu';
    }
}