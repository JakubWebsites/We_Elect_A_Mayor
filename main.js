const gallery = document.querySelector(".gallery");
const instructions = document.querySelector(".instructions");
const quiz = document.querySelector(".quiz");
const result = document.querySelector(".result");
const scoreA = document.querySelector(".score__A");
const scoreB = document.querySelector(".score__B");
const scoreC = document.querySelector(".score__C");
const scoreD = document.querySelector(".score__D");

/* przyciski - buttons */
const start = document.querySelector(".start");
const understand = document.querySelector(".understand");
const accept = document.querySelector(".accept");
const ignore = document.querySelector(".ignore");
const ignoreLast = document.querySelector(".ignore-last");
const summary = document.querySelector(".summary");
const repeat = document.querySelector(".repeat");

/* elementy pytania - label*/
const quizText = document.querySelector(".quiz__text");
const answerOneLabel = document.querySelector(".answer-one-label");
const answerTwoLabel = document.querySelector(".answer-two-label");
const answerThreeLabel = document.querySelector(".answer-three-label");

/* elementy pytania - input*/
const answerInputA = document.querySelector(".answerA");
const answerInputB = document.querySelector(".answerB");
const answerInputC = document.querySelector(".answerC");
let answerList = [answerInputA, answerInputB, answerInputC];

const progress = document.querySelector(".quiz__progress");

/* treść pytań i ich lista */
const question1 = ["Czy w naszym mieście jest wystarczająco dużo buspasów?", "Powinno być ich więcej", "Jest ich wystarczająco dużo", "Jest ich za dużo, należy niektóre zlikwidować"];
const question2 = ["Czy podatek od nieruchomości powinien zostać zmieniony?", "Powinien być podniesiony", "Jest odpowiedni", "Powinien być obniżony"];
const question3 = ["Czy Straż Miejska powinna być zlikwidowana?", "Tak", "Nie, ale powinno się zmniejszyć finansowanie i zatrudnienie", "Nie"];
const question4 = ["Czy należy zlikwidować płatne parkingi w centrum?", "Tak, parkingi powinny być bezpłatne", "Część parkingów powinna zostać płatna", "Nie"];
const question5 = ["Czy należy dofinansować remont katedry ze środków miejskich?", "Tak, pomoc powinna pokryć conajmniej połowę kosztów", "Tak, ale pomoc nie powinna przekroczyć połowy kosztów", "Nie"];
const question6 = ["Czy powierzchnia zajmowana przez parki miejskie jest odpowiednia?", "Powinno się zwiększyć powierzchnię parków", "Jest odpowiednia", "Powinno się zmniejszyć powierzchnię parków"];
const questionList = [question1, question2, question3, question4, question5, question6];

/* potrzebne do obliczeń */
let questionNumber = -1;
let currentQuestion = "";
let currentAnswer = "";

let userScore = [];

const albatros = ["A", "A", "A", "B", "C", "A"];
const bazant = ["B", "B", "B", "A", "C", "B"];
const czapla = ["C", "C", "C", "A", "B", "C"];
const dzieciol = ["A", "B", "C", "A", "C", "B"];

let albatrosConvergence = 0;
let bazantConvergence = 0;
let czaplaConvergence = 0;
let dzieciolConvergence = 0;

let percentA = 0;
let percentB = 0;
let percentC = 0;
let percentD = 0;

let bestConvergence = "";
let secondConvergence = "";

/* FUNKCJE */
const showInstructions = () => {
    gallery.style.display = "none";
    instructions.style.display = "flex";
};

/* zmienia numer pytania i zapisuje kolejne pytania do zmiennej currentQuestion */
const changeQuestion = () => {
    questionNumber = questionNumber + 1;
    currentQuestion = questionList[questionNumber];
};

/* podstawia treść i podpowiedzi aktualnego pytania ze zmiennej currentQuestion i wyświetla je na stronie */
const askQuestion = () => {
    quizText.innerHTML = currentQuestion[0];
    answerOneLabel.innerHTML = currentQuestion[1];
    answerTwoLabel.innerHTML = currentQuestion[2];
    answerThreeLabel.innerHTML = currentQuestion[3];
};

/* pobiera wybrane odpowiedzi i je zapisuje w zmiennej currentAnswer */
const getAnswerFromUser = () => {
    for (answer of answerList)
        {
        if (answer.checked) {
            currentAnswer = answer.value;
            break;}
        else {
            currentAnswer = "0";}
        };
};

/* dodaje wybrane odpowiedzi do listy userScore */
const addAnswerToUserList = () => {
    userScore.push(currentAnswer);
};

/* sprawdza czy użytkownik doszedł do ostatniego pytania i jesli tak, to podmienia
przyciski "zatwierdź" i "pomiń" na przyciski zakańczające quiz */
const waitForEnd = () => {
    if (questionNumber == questionList.length - 1) {
        summary.style.display = "inline";
        ignoreLast.style.display = "inline";
        accept.style.display ="none";
        ignore.style.display ="none";
    }
    else {
        summary.style.display = "none";
        ignoreLast.style.display = "none";
        accept.style.display ="inline";
        ignore.style.display ="inline";
    }
    progress.value = progress.value + 1;
};

/* uruchamia się po zatwierdzeniu odpowiedzi, aby zapisać dane i wyświetlić kolejne pytanie */
const acceptAnswer = () => {
    getAnswerFromUser();
    addAnswerToUserList();
    changeQuestion();
    askQuestion();
    waitForEnd();
};

/* porównują userScore z odpowiedziami kandydatów */
const compareScore = () => {
    for (i = 0; i < questionList.length; i++) {
        if (userScore[i] == albatros[i]) {
            albatrosConvergence = albatrosConvergence + 1;
        }
        if (userScore[i] == bazant[i]) {
            bazantConvergence = bazantConvergence + 1;
        }
        if (userScore[i] == czapla[i]) {
            czaplaConvergence = czaplaConvergence + 1;
        }
        if (userScore[i] == dzieciol[i]) {
            dzieciolConvergence = dzieciolConvergence + 1;
        }
    };
    percentA = Math.round(albatrosConvergence / questionList.length * 100);
    scoreA.innerHTML = percentA + "%";
    percentB = Math.round(bazantConvergence / questionList.length * 100);
    scoreB.innerHTML = percentB + "%";
    percentC = Math.round(czaplaConvergence / questionList.length * 100);
    scoreC.innerHTML = percentC + "%";
    percentD = Math.round(dzieciolConvergence / questionList.length * 100);
    scoreD.innerHTML = percentD + "%";

    showResult();
};


/* uruchamia się po zatwierdzeniu ostatniego pytania i przejściu do podsumowania,
   aby porównać odpowiedzi użytkowanika i wyświetlić wynik */
const summarizeQuiz = () => {
    getAnswerFromUser();
    addAnswerToUserList();
    compareScore();
};

/* uruchamia się po ominięciu pytania, aby zapisać ten fakt i wyświetlić kolejne pytanie */
const ignoreQuestion = () => {
    currentAnswer = "0";
    addAnswerToUserList();
    changeQuestion();
    askQuestion();
    waitForEnd();
};

const ignoreLastQuestion = () => {
    currentAnswer = "0";
    addAnswerToUserList();
    compareScore();
};

/* wyświetla stronę z rezultatem i wywołuje funkcję obliczającą wynik */
const showResult = () => {
    quiz.style.display ="none";
    result.style.display = "flex";
};

const startQuiz = () => {
    instructions.style.display = "none";
    quiz.style.display ="flex";
    changeQuestion();
    askQuestion();
};

const repeatQuiz = () => {
    result.style.display = "none";
    instructions.style.display = "flex";
};

start.addEventListener("click", showInstructions);
understand.addEventListener("click", startQuiz);
accept.addEventListener("click", acceptAnswer);
ignore.addEventListener("click", ignoreQuestion);
ignoreLast.addEventListener("click", ignoreLastQuestion);
summary.addEventListener("click", summarizeQuiz);
repeat.addEventListener("click", repeatQuiz);