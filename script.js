
// GET HTML ELEMENTS
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const messageScreen = document.getElementById("message-screen");

const startBtn = document.getElementById("start-btn");
const noBtn = document.getElementById("no-btn");
const nextBtn = document.getElementById("next-btn");
const revealBtn = document.getElementById("reveal-btn");

const questionNumber = document.getElementById("question-number");
const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const questionSubtitle = document.getElementById("question-subtitle");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const noMessage = document.getElementById("no-message");


// QUESTIONS DATA

const questions = [
  {
    category: "FRIENDSHIP DEPARTMENT",
    question: "Would you rather...",
    subtitle: "Choose carefully. Our friendship depends on it.",
    options: [
      "A. Tolerate my random questions for the rest of your life.",
      "B. Explain your entire PF code to me, line by line, every single day."
    ],
    responses: [
      "A brave decision. Your patience will definitely be tested.",
      "BRO. That's not friendship. That's unpaid tutoring."
    ]
  },
  {
    category: "URGENT FRIENDSHIP EMERGENCY",
    question: "Imagine you wake up tomorrow and discover that I've turned into a LIZARD. What would you do?",
    subtitle: "Please think carefully. Our friendship depends on this. 🦎",
    options: [
      "A. Adopt you. Friendship is friendship.",
      "B. Scream and run. Sorry, survival first.",
      "C. Try to turn you back into a human.",
      "D. Ask if you can still use WhatsApp."
    ],
    responses: [
      "Aww. Even a lizard deserves a loyal friend. 🥹",
      "NOTED. Friendship cancelled. 🦎",
      "Finally, someone taking responsibility.",
      "Your priorities are genuinely concerning."
    ]
  },
  {
    category: "THE PF TRAUMA SIMULATOR",
    question: "Imagine your PF exam is tomorrow. You open the paper and see a 15-line nested loop question. What's your first reaction?",
    subtitle: "Be honest. Nobody is judging. Probably.",
    options: [
      "A. I've got this. (Delusion detected.)",
      "B. Stare at the question until it makes sense.",
      "C. Start questioning my life choices.",
      "D. Pray that the compiler has mercy."
    ],
    responses: [
      "Confidence level: dangerously high.",
      "The question is now staring back at you.",
      "Ah yes, the traditional PF experience.",
      "Even the compiler needs a break."
    ]
  },
  {
    category: "THE GREAT SNACK BETRAYAL",
    question: "You buy your favourite snack and I ask for just ONE bite. What happens next?",
    subtitle: "This answer may permanently affect our friendship. 😭",
    options: [
      "A. Give you one bite. (A VERY small one.)",
      "B. Give you half. Friendship is generosity.",
      "C. Hide the entire packet.",
      "D. Buy another one but secretly regret it."
    ],
    responses: [
      "ONE BITE THE SIZE OF A MOLECULE. Generous. 💀",
      "A true legend. Your snack-sharing privileges are approved.",
      "I KNEW IT. Friendship was a lie. 😭",
      "The guilt is real, but so is the snack attachment."
    ]
  },
  {
    category: "THE 3 AM EMERGENCY",
    question: "Imagine I call you at 3 AM and say, 'I need your help. Don't ask questions.' What's your response?",
    subtitle: "Choose wisely. This is a very important investigation.",
    options: [
      "A. What's wrong? I'm listening.",
      "B. WHAT DID YOU DO THIS TIME?",
      "C. Give me 5 minutes.",
      "D. I'm changing my number."
    ],
    responses: [
      "AWW. Friendship customer support is available 24/7. 🥹",
      "THE FACT THAT YOU ASSUME I'M GUILTY. 😭",
      "Five minutes? That's actually impressive dedication.",
      "Emergency contact status: REVOKED. 💀"
    ]
  },
  {
    category: "THE FINAL DILEMMA",
    question: "You get ONE cheat code for the coming year. What are you choosing?",
    subtitle: "Choose your upgrade wisely.",
    options: [
      "A. Every coding question makes sense instantly.",
      "B. No assignment deadlines. Ever.",
      "C. Unlimited sleep without consequences.",
      "D. Life's problems come with an answer key."
    ],
    responses: [
      "Finally, academic character development.",
      "Someone has clearly suffered enough.",
      "Sleep: the ultimate life goal.",
      "Honestly, this should be a basic human right."
    ]
  }
];


   
    


// CURRENT QUESTION
let currentQuestion = 0;


// SCREEN SWITCHING FUNCTION
function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(function(item) {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}


// START THE GAME
startBtn.addEventListener("click", function() {

    currentQuestion = 0;

    showScreen(quizScreen);

    displayQuestion();

});


// NO BUTTON MISCHIEF
let noAttempts = 0;

const noMessages = [
    "Hmm. Wrong answer.",
    "Are you sure about that?",
    "Your opinion has been rejected.",
    "The YES button is looking rather lonely.",
    "Just press YES already. 😭"
];

noBtn.addEventListener("click", function() {

    noAttempts++;

    noMessage.textContent =
        noMessages[Math.min(noAttempts - 1, noMessages.length - 1)];

    const area = document.getElementById("welcome-buttons");

    const maxX = Math.max(0, area.clientWidth - noBtn.offsetWidth);
    const maxY = 60;

    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

});


// DISPLAY QUESTION
function displayQuestion() {

    const q = questions[currentQuestion];

    questionNumber.textContent =
        "QUESTION " + String(currentQuestion + 1).padStart(2, "0");

    questionCategory.textContent = q.category;

    questionText.textContent = q.question;

    questionSubtitle.textContent = q.subtitle;

    progress.style.width =
        (currentQuestion / questions.length * 100) + "%";

    optionsContainer.innerHTML = "";

    feedback.textContent = "";

    nextBtn.classList.add("hidden");

    q.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");

        button.addEventListener("click", function() {

            // PREVENT CHANGING ANSWERS
            if (nextBtn.classList.contains("hidden") === false) {
                return;
            }

            // HIGHLIGHT SELECTED ANSWER
            document.querySelectorAll(".option-btn").forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            // SHOW FUNNY RESPONSE
            feedback.textContent = q.responses[index];

            // SHOW NEXT BUTTON
            nextBtn.classList.remove("hidden");

        });

        optionsContainer.appendChild(button);

    });

}


// NEXT QUESTION
nextBtn.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        displayQuestion();

    } else {

        progress.style.width = "100%";

        showScreen(resultScreen);

    }

});


// REVEAL BIRTHDAY MESSAGE
revealBtn.addEventListener("click", function() {

    showScreen(messageScreen);

});
