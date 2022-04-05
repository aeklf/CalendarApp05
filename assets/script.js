// Variables
var hourNow = parseInt (moment().format("H"));
var classes = [".8AM", ".9AM", ".10AM", ".11AM", ".12PM", ".1PM", ".2PM", ".3PM", ".4PM", ".5PM", ".6PM"];
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var classIndex = time.indexOf(hourNow);
$("#currentDate").text(moment().format("DD/MM/YY"));
var currentDateCheck = moment().format("DD/MM/YY");
var allNotes = ["", "", "", "", "", "", "", "", "", "", ""];

if (hourNow <9) {
    allFuture();
} else if (hourNow >18) {
    allPast();
} else {
    formatTimes()
}

grabData();
checkDay();

function allFuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

function allPast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length -1]).addClass("present");
}

function formatTimes() {
    $(classes[classIndex]).addClass("present");
    for (i = 0; i < classIndex; i++) {
        $(classes[i]).addClass("past");
    }
    for (i = classIndex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}

$(".saveBtn").on("click", function () {
    var di = $(this).data("index");
    allNotes[di] = $(classes[di]).valueOf();
    localStorage.setItem("allNotes", JSON.stringify(allNotes))
    alert("Saved!")
})

function grabData() {
    allNotes = JSON.parse(localStorage.getItem("allNotes"));
    if (allNotes == null) {
        allNotes = ["", "", "", "", "", "", "", "", "", "", ""];
        return;
    }
    for (i = 0; i < classes.length; i++) {
        ($(classes[i])).val(allNotes[i]);
    }
}

$(".clear").on("click", function(){ 
    cleardata()
})

function cleardata() {
    var confirmDelete = confirm("Are you sure you want to delete all data?");
    if (confirmDelete == true) {
        allNotes = ["", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem("allNotes", JSON.stringify(allNotes));
        grabData();
    }
}

$(".save").on("click", function () {
    for (i = 0; i < classes.length; i++) {
        allNotes[i] = $(classes[i]).val();
    }
    localStorage.setItem('allNotes', JSON.stringify(allNotes))
    alert("Data Saved!")
})