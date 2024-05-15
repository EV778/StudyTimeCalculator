document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the result from localStorage
    var studyHoursResult = parseFloat(localStorage.getItem("studyHoursResult"));
    console.log("Retrieved result from localStorage:", studyHoursResult); // Debug: Check the retrieved result

    // Calculate daily study hours by dividing the weekly hours by 7
    var dailyStudyHours = studyHoursResult / 7;
    var dailyStudyHoursFormatted = dailyStudyHours.toFixed(2); // Format to 2 decimal places for better readability

    // Define study status based on daily study hours result
    var studyStatus;
    if (!isNaN(dailyStudyHours)) { // Check if the dailyStudyHours is a valid number
        if (dailyStudyHours >= 80 / 7) {
            studyStatus = "You are good. You have approximately " + dailyStudyHoursFormatted + " hours each day to work on assignments/study.";
        } else if (dailyStudyHours >= 60 / 7 && dailyStudyHours < 80 / 7) {
            studyStatus = "Medium. You have enough time each day for study but could manage it better.";
        } else if (dailyStudyHours >= 40 / 7 && dailyStudyHours < 60 / 7) {
            studyStatus = "You might be taking on too much. Consider prioritizing your tasks.";
        } else if (dailyStudyHours >= 0 && dailyStudyHours < 40 / 7) {
            studyStatus = "Not good. You will be struggling with insufficient daily study time. Consider reducing your workload.";
        } else {
            studyStatus = "Not enough hours in the day. Rearrange your schedule to accommodate more daily study time.";
        }
    } else {
        studyStatus = "Invalid data received. Please try submitting the form again.";
    }

    // Find the HTML elements where the results should be displayed
    var resultElement = document.getElementById("result");
    var studyStatusElement = document.getElementById("studyStatus");

    if (resultElement && studyStatusElement) { // Ensure both elements are found
        resultElement.textContent = "You have " + studyHoursResult + " hours available to spend on studying per week";
        studyStatusElement.textContent = studyStatus;
    } else {
        console.error("One or more result elements were not found on this page.");
    }
});
