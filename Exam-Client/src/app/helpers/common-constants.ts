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
    // authentication service
    restorePassword: string;
    updatePassword: string;
    login: string;
    register: string;
    // exam service
    getExam:string;
    saveAnswer:string;
    generateReport:string;
     // test service
     addTest:string;
     getTestsByField:string;
     getTestById:string;
     // user service
     createUser:string;

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
        //authentication service
        this.restorePassword = 'http://localhost:8000/api/Authentication/restorePassword/';
        this.updatePassword = 'http://localhost:8000/api/Authentication/updatePassword/';
        this.login = 'http://localhost:8000/api/Authentication/login/';
        this.register = 'http://localhost:8000/api/Authentication/register';
        // exam service
        this.getExam = 'http://localhost:8000/api/Tests/getExam/';
        this.saveAnswer = 'http://localhost:8000/api/Tests/saveAnswer/';
        this.generateReport = 'http://localhost:8000/api/Tests/generateReport/';
        // test service
        this.addTest = 'http://localhost:8000/api/Tests/createTest';
        this.getTestsByField = 'http://localhost:8000/api/Tests/getTestsByField/';
        this.getTestById = 'http://localhost:8000/api/Tests/getTestById/';
        // user service
        this.createUser = 'http://localhost:8000/api/User/createUser/';
    }
}