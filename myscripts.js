document.addEventListener("DOMContentLoaded", function () {
    // Material schedule form animation
    var formControls = document.querySelectorAll(".schedule-form .form-control");
    formControls.forEach(function (input) {
        var targetItem = input.parentElement;
        if (input.value) {
            var label = targetItem.querySelector("label");
            label.style.top = "-6px";
            label.style.fontSize = "16px";
            label.style.color = "#0077B6";
        }
    });

    formControls.forEach(function (input) {
        input.addEventListener("focus", function () {
            var inputBlock = this.closest(".input-block");
            inputBlock.classList.add("focus");
            var label = inputBlock.querySelector("label");
            // Animate label on focus
            label.style.transition = "300ms";
            label.style.top = "-6px";
            label.style.fontSize = "16px";
            label.style.color = "#0077B6";
        });

        input.addEventListener("blur", function () {
            if (this.value.length === 0) {
                var inputBlock = this.closest(".input-block");
                inputBlock.classList.remove("focus");
                var label = inputBlock.querySelector("label");
                // Animate label on blur
                label.style.transition = "300ms";
                label.style.top = "20px";
                label.style.fontSize = "18px";
            }
        });
    });


    //code to make sure the form is filled out and then send the results
    //to the next page

    // Handle submit button click
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (allQuestionsAnswered()) {
            // define the variable by calling the calculateStudyHours function and storing its return value.
            var studyHoursResult = calculateStudyHours();

            // Check if studyHoursResult is not null or undefined
            if (studyHoursResult) {
                console.log("Saving result:", studyHoursResult); // This should show the calculated result
                // After calculations, navigate to results.html page to display results using local storage
                localStorage.setItem("studyHoursResult", studyHoursResult);
                // Navigate to the next page to display result
                window.location.href = "results.html";
            } else {
                // Handle the case where studyHoursResult is not defined
                alert("There was an error calculating the study hours. Please try again.");
            }
        } else {
            alert("Please answer all questions.");
        }

        function calculateStudyHours() {
            var q1Input = document.getElementById("q1");
            var q2Input = document.getElementById("q2");
            var q3Input = document.getElementById("q3");
            var q4Input = document.getElementById("q4");
            var q5Input = document.getElementById("q5");
            var q6Input = document.getElementById("q6");
            // var resultElement = document.getElementById("result");

            var credits = parseFloat(q1Input.value) || 0;
            var classHours = parseFloat(q2Input.value) || 0;
            var extracurricularHours = parseFloat(q3Input.value) || 0;
            var workHours = parseFloat(q4Input.value) || 0;
            var sleepHours = parseFloat(q5Input.value) || 0;
            var personalHours = parseFloat(q6Input.value) || 0;

            var totalHoursAvailable = 168; // 24 hours * 7 days
            var totalStudyHours = totalHoursAvailable - (classHours + extracurricularHours + workHours + sleepHours * 7 + personalHours);
            return totalStudyHours.toFixed(2);
            // resultElement.textContent = "You have " + totalStudyHours.toFixed(2) + " hours available to spend on studying per week.";
            // resultElement.style.display = "block";

            //if totalHoursAvailble: = 80 hours or more: You good (12hrs a day to work on assignments/study)
            //else if: between 60 and 80: medium
            //else if: between 40 and 60: You might be taking on too much
            //else if: <40: Not good, you will be struggling
            //else: = <0: Not enough hours in the day. Rearrange your schedule 

            // function getStudyStatus(totalStudyHours) {
            //     if (totalStudyHours >= 80) {
            //         return "You're good. You have 12 hours a day to work on assignments/study.";
            //     } else if (totalStudyHours >= 60 && totalStudyHours < 80) {
            //         return "Medium. You have a reasonable amount of time for study.";
            //     } else if (totalStudyHours >= 40 && totalStudyHours < 60) {
            //         return "You might be taking on too much. Consider managing your time better.";
            //     } else if (totalStudyHours < 40 && totalStudyHours >= 0) {
            //         return "Not good. You will be struggling with insufficient study time.";
            //     } else {
            //         return "Not enough hours in the day. Rearrange your schedule to accommodate more study time.";
            //     }
            // }

        }

    });



    function allQuestionsAnswered() {
        const ids = ["q1", "q2", "q3", "q4", "q5", "q6"];
        return ids.every(id => {
            const element = document.getElementById(id);
            return element && element.value; // Check both for element existence and value
        });
    }


});

//tesing

