const gradesPoints = document.body.querySelector(".gradesPoints");
const gradesList = document.body.querySelector(".gradesList");
const tbody = gradesList.querySelector("tbody");
const trs = tbody.querySelectorAll("tr");
let childDiv = document.createElement("div");

let grades = [];
let ECTs = [];
let courseNames = [];
let courseCodes = [];
for (let i of [...Array(trs.length - 1).keys()].map(i=>i+1)) {
    let tmp = trs[i].innerText.split("\t");
    let courseCode = tmp[0];
    let courseName = tmp[1];
    let grade = Number(tmp[2].split(" ")[0]);
    let ECT = Number(tmp[3]);
    if (!isNaN(grade)) {
        courseCodes.push(courseCode);
        courseNames.push(courseName);
        grades.push(grade);
        ECTs.push(ECT);
    }
}

const summary = gradesPoints.appendChild(childDiv);
summary.id = "summary";

summary.innerHTML += `<h2 style="color:blue; margin: 12px 0 2px 0" xmlns:formatter="urn:formatter">Grade summary:</h2>`;
const summary_tbody = summary.appendChild(document.createElement('tbody'));
summary_tbody.innerHTML += trTextFromPair([
    ["Weighted average", weightedAverage(grades, ECTs)],
    ["GPA in procentage", GPAinProcentage(grades, ECTs)],
]);

// Create a child under gradesPoints
gradesPoints.appendChild(childDiv);

// Create button
let toggleButton = document.createElement("button");
toggleButton.type = "button";  // Ensures it's not treated as a submit button
toggleButton.textContent = "More details";
childDiv.appendChild(toggleButton);

// Create text element
let textElement = document.createElement("tbody");
textElement.innerHTML = `
    ${trTextFromPair([
        ["ECTs", ECTs.join(", ")],
        ["Grades", grades.join(", ")],
        // ["Unique grades", getUniqueDescendingArray(grades).join(", ")],
    ])}
    ${gradesCoursesSummaryText(grades, courseCodes,courseNames)}
`;
textElement.style.display = "none";
childDiv.appendChild(textElement);

// Create a child under gradesPoints
gradesPoints.appendChild(childDiv);

// Create report button
let reportButton = document.createElement("button");
reportButton.type = "button";  // Ensures it's not treated as a submit button
reportButton.textContent = "Feedback";
reportButton.onclick = () => window.open("https://forms.gle/rKxKQFXUfy45b7XWA", "_blank");
reportButton.style.display = "none";
childDiv.appendChild(reportButton);

// Toggle function
toggleButton.addEventListener("click", function () {
    textElement.style.display = textElement.style.display === "none" ? "block" : "none";
    reportButton.style.display = reportButton.style.display === "none" ? "block" : "none";
});

function weightedAverage(grades, ECTs, decimals = 2) {
    let sum = 0;
    let ECTsum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i] * ECTs[i];
        ECTsum += ECTs[i];
    }
    return (sum / ECTsum).toFixed(decimals);
}

function naiveAverage(grades, decimals = 2) {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }
    return (sum / grades.length).toFixed(decimals);
}

function trTextFromPair(text_grade_pair_array) {
    let trsText = "";
    for (let [text, grades] of text_grade_pair_array) {
        trsText += trText(text, grades);
    }
    return trsText;
}

function trText(a, b, className="default") {
    return `<tr class="context_direct" style="font-weight: bold"><td class="${className}_tr1">${a}</td><td class="${className}_tr2">${b}</td></tr>`;
}

function getUniqueDescendingArray(arr) {
    let a = [...new Set(arr)].map(x => Number(x));
    a.sort((a, b) => b - a);
    return a;
}

function gradesCoursesSummaryText(grades, courseCodes, courseNames, className="gradesCoursesSummary") {
    let uniqueGrades = getUniqueDescendingArray(grades);
    let text = "";
    for (let i = 0; i < uniqueGrades.length; i++) {
        let filteredGrade = uniqueGrades[i];
        let filteredCourseNames = courseNames.filter((_, index) => 
            grades.map(x => 
                x == filteredGrade
            )[index]
        );
        let filteredCourseCodes = courseCodes.filter((_, index) => 
            grades.map(x => 
                x == filteredGrade
            )[index]
        );

        let filteredCourseCodeNameText = codeNameCombinedText(filteredCourseCodes, filteredCourseNames).join(", <br>");
        let filteredGradeText = `${filteredGrade} (${filteredCourseNames.length})`;
        text += trText(filteredGradeText, filteredCourseCodeNameText, className);
    }
    return text;
}

function codeNameCombinedText(courseCodes, courseNames) {
    let ls = [];
    for (let i = 0; i < courseCodes.length; i++) {
        ls.push(`${courseCodes[i]} ${courseNames[i]}`);
    }
    return ls;
}

function GPAinProcentage(grades, ECTs) {
    return ((weightedAverage(grades, ECTs, decimals = 100) - 2.0)*(10.0)).toFixed(2) + "%";
}