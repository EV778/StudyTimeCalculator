document.addEventListener("DOMContentLoaded", function () {
    var q1Input = document.getElementById("q1");
    var q2Input = document.getElementById("q2");
    var extracurricularYes = document.getElementById("extracurricularYes");
    var promptInput1 = document.getElementById("promptInput1");
    var workYes = document.getElementById("workYes");
    var promptInput2 = document.getElementById("promptInput2");
    var q5Input = document.getElementById("q5");
    var q6Input = document.getElementById("q6");
    var resultElement = document.getElementById("result");
    var sendButton = document.querySelector("button[type='submit']"); // submit button

    //calculate and display results
    function calculateStudyHours() {
        // Ensure all inputs have values before calculating
        if (allQuestionsAnswered()) {
            var credits = parseFloat(q1Input.value) || 0;
            var classHours = parseFloat(q2Input.value) || 0;
            var extracurricularHours = extracurricularYes.checked ? parseFloat(promptInput1.value) || 0 : 0;
            var workHours = workYes.checked ? parseFloat(promptInput2.value) || 0 : 0;
            var sleepHours = parseFloat(q5Input.value) || 0;
            var personalHours = parseFloat(q6Input.value) || 0;

            // Total hours available in a week minus hours spent on various activities
            var totalHoursAvailable = 168; // 24 hours * 7 days
            var totalStudyHours = totalHoursAvailable - (classHours + extracurricularHours + workHours + sleepHours * 7 + personalHours);

            //if totalHoursAvailble: = 80 hours or more: You good (12hrs a day to work on assignments/study)
            //else if: between 60 and 80: medium 
            //else if: between 40 and 60: You might be taking on too much 
            //else if: <40: Not good, you will be struggling 
            //else: = <0: Not enough hours in the day. Rearrange your schedule 

            // Display the result
            resultElement.textContent = "You have " + totalStudyHours.toFixed(2) + " hours available to spend on studying per week.";
            resultElement.style.display = "block";
        } else {
            resultElement.style.display = "none";
        }
    }

    //function making sure all questions were answered
    function allQuestionsAnswered() {
        // Check if base questions have values
        if (!q1Input.value || !q2Input.value || !q5Input.value || !q6Input.value) {
            return false;
        }
        // Check if conditional questions related to 'yes' responses have values
        if (extracurricularYes.checked && !promptInput1.value) {
            return false;
        }
        if (workYes.checked && !promptInput2.value) {
            return false;
        }
        return true; // All required questions have been answered
    }

    // event listeners to all inputs for the calculation
    [q1Input, q2Input, promptInput1, promptInput2, q5Input, q6Input].forEach(function (input) {
        input.addEventListener("change", calculateStudyHours);
    });

    // event listeners to radio buttons to show/hide conditional questions
    extracurricularYes.addEventListener("change", function () {
        document.getElementById("promptQuestion1").style.display = this.checked ? "block" : "none";
        calculateStudyHours(); // Recalculate if the state changes
    });
    extracurricularNo.addEventListener("change", function () {
        document.getElementById("promptQuestion1").style.display = "none";
        calculateStudyHours(); // Recalculate if the state changes
    });
    workYes.addEventListener("change", function () {
        document.getElementById("promptQuestion2").style.display = this.checked ? "block" : "none";
        calculateStudyHours(); // Recalculate if the state changes
    });
    workNo.addEventListener("change", function () {
        document.getElementById("promptQuestion2").style.display = "none";
        calculateStudyHours(); // Recalculate if the state changes
    });


    // Function to handle the click event on the "Submit" button
    sendButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the form from submitting if it's inside a <form> element
        calculateStudyHours(); // Call function to calculate and display the results
    });
});


