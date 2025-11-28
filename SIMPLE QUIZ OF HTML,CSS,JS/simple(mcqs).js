var mcqsQuestions = [
    {
       question : "HTML stand for",
       options :["Hyper Text Multiy Language","both A and C","Hyper Text Markup Language","Non of these"],
       answer : 2
    },
    {
       question : "In JavaScript, which keyword is used to define a function?",
       options : ["function","method","define","script"],
       answer : 0 
    },
    {
       question : "CSS STAND FOR",
       options :["Computer Style Sheets","Creative Style Sheets","Content Style Sheets","Cascading Style Sheets"],
       answer : 3 
    },
    {
       question : "Which is the largest HTML heading tag?",
       options :["The h1 tag","The p tag","The h4 tag","The h6 tag"],
       answer : 0 
    },
    {
       question : "Which HTML element specifies a footer for a document or section?",
       options :["The <section> tag","The <footer> tag","The <bottom> tag","The <aside> tag"],
       answer : 1 
    },
    {
       question : "Which CSS property controls the text size?",
       options :["text-style","font-size","text-height","font-style"],
       answer : 1
    },
    {
       question : "In CSS, what does the 'C' stand for?",
       options :["Current","Cascading","Creative","Complete"],
       answer : 1
    },
    {
       question : "Which is the correct way to link an external JavaScript file?",
       options :["Use the src attribute in ","Use the href attribute in link","Use the js tag","Use the name attribute in script"],
       answer : 0
    },
    {
       question : "Which JavaScript method is used to remove the last element from an array?",
       options :["shift()","splice()","pop()","push()"],
       answer : 2
    },
    {
       question : "What is the primary purpose of Bootstrap?",
       options :["Database management","Back-end API creation","Front-end responsive development","Server-side scripting"],
       answer : 2
    },
    {
       question : "Which Bootstrap class is used to create a responsive, fixed-width container?",
       options :["container-fluid","container-fixed","wrapper","container"],
       answer : 3
    },
    {
       question : "In JavaScript, how do you declare a variable that cannot be re-assigned?",
       options :["var","let","const","static"],
       answer : 2
    },
    {
       question : "Which CSS selector targets elements with a specific attribute like 'data-value'?",
       options :["#data-value","[data-value]","element.data-value",".data-value"],
       answer : 1
    },
    {
       question : "What is the correct Bootstrap class for a primary (blue) button?",
       options :["btn-default","btn-main","btn-primary","btn-info"],
       answer : 2
    },
    {
       question : "The `box-sizing: border-box;` property in CSS does what?",
       options :["Includes margin in the element's total width and height.","Includes padding and border in the element's total width and height.","Removes padding from the element.","Sets the box model to a specific size."],
       answer : 1
    }
]

var score = 0; //start
var answerOptions = []; //declare answer store

console.log(mcqsQuestions.length)

var userName = prompt("Enter User Name");

// --- Start of Username Validation ---
// Loop until a non-empty, non-numeric name is entered
while (!userName || userName.trim() === "" || !isNaN(userName.trim())) {
    alert("Please enter a valid name (not a number or empty).");
    userName = prompt("Enter User Name");
}
// --- End of Username Validation ---


function showQuiz() {
  var countScore = 100 / mcqsQuestions.length; // count dynmaically none question score
  for (var i = 0; i < mcqsQuestions.length; i++) {
    var userInput;
    var isValidInput = false;

    // --- Start of Option Input Validation ---
    while (!isValidInput) {
        userInput = prompt(`
        Question ${i+1} of ${mcqsQuestions.length}
        Question ${i + 1} : ${mcqsQuestions[i].question}  ?
          
            a) ${mcqsQuestions[i].options[0]}
            b) ${mcqsQuestions[i].options[1]}
            c) ${mcqsQuestions[i].options[2]}
            d) ${mcqsQuestions[i].options[3]}
            `);

        if (userInput) {
            userInput = userInput.toLowerCase().trim(); // Convert to lowercase and remove spaces for easy comparison
            if (userInput === 'a' || userInput === 'b' || userInput === 'c' || userInput === 'd') {
                isValidInput = true;
            } else {
                alert("Please enter only an option letter: a, b, c, or d.");
            }
        } else {
             alert("Please enter only an option letter: a, b, c, or d.");
        }
    }
    // --- End of Option Input Validation ---
    
    answerOptions.push(userInput);

    // Map user input letter (a, b, c, d) to the index (0, 1, 2, 3) for comparison
    var userIndex = -1;
    if (userInput === 'a') {
        userIndex = 0;
    } else if (userInput === 'b') {
        userIndex = 1;
    } else if (userInput === 'c') {
        userIndex = 2;
    } else if (userInput === 'd') {
        userIndex = 3;
    }

    // Check if the user's selected option index matches the correct answer index
    if (userIndex === mcqsQuestions[i].answer) {
      score = score + countScore;
    }
  }
  alert("Your total score is " + score.toFixed(0));
  showOutput();
}

function showOutput() {
    // Calculate score percentage (already done by the original logic: score is the percentage)
    var finalScore = score.toFixed(0);
    
    // Determine success/danger color for the progress bar
    var progressBarColor = finalScore <= 50 ? "bg-danger" : "bg-success";
    
    // --- START of Responsive Score Display ---
    document.writeln(`
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6"> 
                    
                    <h1 class="mb-4 text-center">Quiz Results for: <strong style="color: rgb(32, 32, 145);font-family: 'Times New Roman', Times, serif;">${userName}</strong></h1>

                    <div class="text-center mb-3">
                        <h2>Final Score: ${finalScore}%</h2>
                    </div>

                    <div class="progress mb-5" role="progressbar" aria-label="Score Progress" aria-valuenow="${finalScore}" aria-valuemin="0" aria-valuemax="100" style="height: 30px;">
                        <div class="progress-bar ${progressBarColor}" style="width: ${finalScore}%">
                            ${finalScore}%
                        </div>
                    </div>

                </div>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <h2 class="text-center mb-4">Detailed Answers</h2>
                </div>
            </div>
        </div>
    `);
    // --- END of Responsive Score Display ---

    // Helper function to convert the stored answer letter back to the correct index for display
    function getAnswerIndexFromLetter(letter) {
      if (letter === 'a') return 0;
      if (letter === 'b') return 1;
      if (letter === 'c') return 2;
      if (letter === 'd') return 3;
      return -1; 
    }

    for (var i = 0; i < mcqsQuestions.length; i++) {
      // Determine the user's selected option text for display
      var userSelectedOptionText = "N/A";
      var userAnsLetter = answerOptions[i];
      var userAnsIndex = getAnswerIndexFromLetter(userAnsLetter);
      if (userAnsIndex !== -1) {
          userSelectedOptionText = mcqsQuestions[i].options[userAnsIndex];
      }
      
      // Determine the correct option text for display
      var correctAnsIndex = mcqsQuestions[i].answer;
      var correctAnsText = mcqsQuestions[i].options[correctAnsIndex];
      
      // Check if the user's answer is correct for styling the card border
      var isCorrect = userAnsIndex === correctAnsIndex;
      var cardBorderClass = isCorrect ? 'border-success' : 'border-danger';
      var textClass = isCorrect ? 'text-success' : 'text-danger';

      // --- START of Responsive Question Card Display ---
      document.writeln(`
        <div class="container">
          <div class="row justify-content-center">
              <div class="col-12 col-md-10 col-lg-8"> 
                  <div class="card shadow-sm mb-4 ${cardBorderClass}" style="border-width: 2px;">

                      <div class="card-body">
                          <h5 class="card-title">
                              <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'} me-2">Q${i + 1}</span> 
                              ${mcqsQuestions[i].question}
                          </h5>
                          <hr>
                          <p class="card-text">
                              <ul class="list-unstyled">
                                  <li>**a)** ${mcqsQuestions[i].options[0]}</li>
                                  <li>**b)** ${mcqsQuestions[i].options[1]}</li>
                                  <li>**c)** ${mcqsQuestions[i].options[2]}</li>
                                  <li>**d)** ${mcqsQuestions[i].options[3]}</li>
                              </ul>
                              
                              <div class="mt-3 p-2 border-top">
                                  <p class="mb-1">**Correct Answer:** <span class="text-success fw-bold">${correctAnsText}</span></p>
                                  <p class="mb-1">**Your Option:** <span class="${textClass} fw-bold">${userAnsLetter.toUpperCase()}</span></p>
                                  <p class="mb-0">**Your Answer:** <span class="${textClass} fw-bold">${userSelectedOptionText}</span></p>
                              </div>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      `);
      // --- END of Responsive Question Card Display ---
    }
}

showQuiz();