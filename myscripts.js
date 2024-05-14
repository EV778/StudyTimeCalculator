document.addEventListener("DOMContentLoaded", function () {
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
                label.style.transition = "300ms";
                label.style.top = "20px";
                label.style.fontSize = "18px";
            }
        });
    });

    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (allQuestionsAnswered()) {
            var studyHoursResult = calculateStudyHours();
            console.log("Calculated Study Hours:", studyHoursResult);
            if (studyHoursResult) {
                localStorage.setItem("studyHoursResult", studyHoursResult);
                window.location.href = "results.html";
            } else {
                alert("There was an error calculating the study hours. Please try again.");
            }
        } else {
            alert("Please answer all questions.");
        }
    });

    function calculateStudyHours() {
        var q1Input = document.getElementById("q1").value;
        var q2Input = document.getElementById("q2").value;
        var q3Input = document.getElementById("q3").value;
        var q4Input = document.getElementById("q4").value;
        var q5Input = document.getElementById("q5").value;
        var q6Input = document.getElementById("q6").value;

        var credits = parseFloat(q1Input) || 0;
        var classHours = parseFloat(q2Input) || 0;
        var extracurricularHours = parseFloat(q3Input) || 0;
        var workHours = parseFloat(q4Input) || 0;
        var sleepHours = parseFloat(q5Input) || 0;
        var personalHours = parseFloat(q6Input) || 0;

        var totalHoursAvailable = 168; // 24 hours * 7 days
        var totalStudyHours = totalHoursAvailable - (classHours + extracurricularHours + workHours + (sleepHours * 7) + personalHours);

        // Ensure totalStudyHours is within a valid range
        if (totalStudyHours < 0) {
            return 0; // Set to 0 if negative
        } else if (totalStudyHours > totalHoursAvailable) {
            return totalHoursAvailable; // Set to totalHoursAvailable if greater than available hours
        } else {
            return totalStudyHours.toFixed(2);
        }
    }



    function allQuestionsAnswered() {
        const ids = ["q1", "q2", "q3", "q4", "q5", "q6"];
        return ids.every(id => {
            const element = document.getElementById(id);
            return element && element.value;
        });
    }
});
