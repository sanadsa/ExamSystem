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
    deleteAnswers: string;
    editQuestion: string;
    addAnswer: string;
    updateAnswer: string;
    // rooutes
    questionsListRoute: string;
    questionFormRoute: string;
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
        this.editQuestion = 'http://localhost:8000/api/Question/editQuestion';
        this.getQuestions = 'http://localhost:8000/api/Question/getQuestions/';
        this.deleteQuestion = 'http://localhost:8000/api/Question/deleteQuestion/';
        this.deleteAnswers = 'http://localhost:8000/api/Question/deleteAnswers/';
        this.getAnswers = 'http://localhost:8000/api/Question/getAnswers/';
        this.addAnswer = 'http://localhost:8000/api/Question/createAnswer';
        this.updateAnswer = 'http://localhost:8000/api/Question/editAnswer';
        // routes
        this.questionsListRoute = '/questionList';
        this.questionFormRoute = '/questionForm';
        this.mainMenu = '/mainmenu';
    }
}