document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the result from localStorage
    var studyHoursResult = parseFloat(localStorage.getItem("studyHoursResult"));

    // Calculate study status based on study hours result
    var studyStatus;
    if (studyHoursResult >= 80) {
        studyStatus = "You're good. You have 12 hours a day to work on assignments/study.";
    } else if (studyHoursResult >= 60 && studyHoursResult < 80) {
        studyStatus = "Medium. You have enough time for study but could manage it better.";
    } else if (studyHoursResult >= 40 && studyHoursResult < 60) {
        studyStatus = "You might be taking on too much. Consider prioritizing your tasks.";
    } else if (studyHoursResult >= 0 && studyHoursResult < 40) {
        studyStatus = "Not good. You will be struggling. Consider reducing your workload.";
    } else {
        studyStatus = "Not enough hours in the day. Rearrange your schedule.";
    }

    // Find the HTML element where the result should be displayed
    var resultElement = document.getElementById("result");
    var studyStatusElement = document.getElementById("studyStatus");

    // If the resultElement exists, proceed to use it
    if (resultElement && studyStatusElement) {
        console.log("Retrieved result:", studyHoursResult);
        // Check if there is a result to display
        if (studyHoursResult) {
            // If there is a result, display it
            resultElement.textContent = "You have " + studyHoursResult + " hours available to spend on studying per week.";
            studyStatusElement.textContent = studyStatus;
        } else {
            // If there is no result (e.g., if the user navigated directly to the results page without submitting the form), display a default message or handle as needed
            resultElement.textContent = "No results to display. Please fill out the form on the homepage.";
        }
    } else {
        console.error("One or more result elemenents was not found on this page.");
    }
});
