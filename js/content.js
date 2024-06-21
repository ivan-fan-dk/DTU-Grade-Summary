const gradesPoints = document.body.querySelector(".gradesPoints");
const gradesList = document.body.querySelector(".gradesList");
const tbody = gradesList.querySelector("tbody");
const trs = tbody.querySelectorAll("tr");

let grades = [];
let ECTs = [];
for (let i of [...Array(trs.length - 1).keys()].map(i=>i+1)) {
    let tmp = trs[i].innerText.split("\t")
    let grade = Number(tmp[2].split(" ")[0])
    let ECT = Number(tmp[3])
    if (!isNaN(grade)) {
        grades.push(grade);
        ECTs.push(ECT);
    }
}

const Totalpoints = gradesPoints.querySelectorAll("table")[1];
Totalpoints.innerHTML += (`<tr class="context_direct" style="font-weight: bold"><td style="padding-right: 20px">Naïve average</td><td style="color: green; text-align: center">${naiveAverage(grades)}</td></tr>`);
Totalpoints.innerHTML += (`<tr class="context_direct" style="font-weight: bold"><td style="padding-right: 20px">Weighted average</td><td style="color: green; text-align: center">${weightedAverage(grades, ECTs)}</td></tr>`);

function weightedAverage(grades, ECTs, decimals = 1) {
    let sum = 0;
    let ECTsum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i] * ECTs[i];
        ECTsum += ECTs[i];
    }
    return (sum / ECTsum).toFixed(decimals);
}

function naiveAverage(grades, decimals = 1) {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }
    return (sum / grades.length).toFixed(decimals);
}