// Questions Array
const questions = [
  { Question: "Enter Your First Name" },
  { Question: "Enter Your Last Name" },
  { Question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { Question: "Create A Password", type: "password" }
];

// Transition Times
const shakeTime = 100; //Shake Transition Time
const switchTime = 200; // Transition B/W Qns

// Init Position At First Question
let Position = 0;

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

// EVENTS

// Get Question On DOM Load
document.addEventListener("DOMContentLoaded", getQuestion);

// Next Button Click
nextBtn.addEventListener("click", validate);

inputField.addEventListener("keyup", e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTION
// Get Question From Array &Add To Markup
function getQuestion() {
  inputLabel.innerHTML = questions[Position].Question;
  // Get Current Type
  inputField.type = questions[Position].type;
  // Get Current Answer
  inputField.value = "";
  // Focus On Element
  // inputField.focus();

  // Set Progress Bar Width - Variable to the question Array Length
  progress.style.width = (Position * 100) / questions.length + "%";

  // Add User Icon or back arrow Depending on Question
  prevBtn.className = Position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

// Display Question to User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "";
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field

function validate() {
  // Make Sure Pattern Matches If There Is One

  if (!inputField.value.match(questions[Position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = "error";
  // RepeatShake Motion -  set i to numbers of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    // setTimeout(transform, shakeTime * 0, -20, 0);
    // setTimeout(transform, shakeTime * 1, 20, 0);
    // setTimeout(transform, shakeTime * 2, -20, 0);
    // setTimeout(transform, shakeTime * 3, 20, 0);
    // setTimeout(transform, shakeTime * 4, -20, 0);
    // setTimeout(transform, shakeTime * 5, 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    // inputField.focus();
  }
}

// Field Input Pass
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer in Array
  questions[Position].answer = inputField.value;
  // Increment Position
  Position++;

  // If new question ,Hide Current And Get Next
  if (questions[Position]) {
    // hideQuestion();
    getQuestion();
  } else {
    // hideQuestion();
    formBox.className = "close";

    // Form Complete
    formComplete();
  }
}

// All fields Complete - Show h1 end

function formComplete() {
  console.log(questions);
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${questions[0].answer} you are registered and will get an email shortly!`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1;
    }, 50);
  }, 1000);
}
