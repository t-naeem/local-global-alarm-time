let tmpDate;
let date;
let time;
let intlTimesTag;

var count = 0;
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
let loadingBrowseTimes;

const sound = new Audio("Ringtone.wav");
sound.loop = true;
sound.playbackRate = 0.65;

function localTime() {
    setInterval(() => {
        tmpDate = new Date();
        date = tmpDate.toLocaleDateString(undefined, options);
        secondsTime = (tmpDate.getSeconds() < 10 ? "0" + tmpDate.getSeconds() : tmpDate.getSeconds());
        minutesTime = (tmpDate.getMinutes() < 10 ? "0" + tmpDate.getMinutes() : tmpDate.getMinutes());
        hoursTime = (tmpDate.getHours() < 10 ? "0" + tmpDate.getHours() : tmpDate.getHours());
        time = `${hoursTime}:${minutesTime}:${secondsTime}`;
        timeZoneLoc = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById('time').innerHTML = `${timeZoneLoc} : ${time} <br>on ${date}`;
    }, 1000);
    return time;
}

localTime();

function browseTimes() {
    document.getElementById("toggleBrowseCollapse").innerText = "Collapse All Timezones";
    intlTimesTag = document.getElementById('intlTimes');

    if (intlTimesTag.style.display === "block") {
        document.getElementById("toggleBrowseCollapse").innerText = "Browse Timezones";
        intlTimesTag.style.display = "none";
        window.location.reload();
    }
    
    else {
        intlTimesTag.style.display = "block";
        loadingBrowseTimes = document.getElementById("loadingBrowseTimes");
        loadingBrowseTimes.style.display = "block";
        intlTimesTag.className = "jumbotron";
        setInterval(() => {
            loadingBrowseTimes.style.display = "none";
            let intlTimeZones = Intl.supportedValuesOf('timeZone');
            let date = new Date;
            document.getElementById('intlTimes').innerHTML = "";
            intlTimeZones.forEach((timeZone) => {
                let strDateTime = date.toLocaleString("en-GB", { timeZone: `${timeZone}` });
                strDay = strDateTime.slice(0, 2);
                strMonth = strDateTime.slice(3, 5) - "1";
                strYear = strDateTime.slice(6, 10);
                strHour = strDateTime.slice(12, 14);
                strMinute = strDateTime.slice(15, 17);
                strSecond = strDateTime.slice(18, 20);
                strDateNTime = new Date(strYear, strMonth, strDay, strHour, strMinute, strSecond);
                strDate = strDateNTime.toLocaleDateString(undefined, options);
                strTime = strHour + ":" + strMinute + ":" + strSecond;

                document.getElementById('intlTimes').innerHTML += `<p>  ${timeZone} : ${strTime} on ${strDate} </p><br>`;
            });
        }, 1000);
    }
}

const hoursArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
function hoursSelection() {
    let select = document.getElementById("alarmHours");
    hoursArr.forEach(element => {
        select.options[select.options.length] = new Option(element);
    });
    select.options[select.selectedIndex].value
}
hoursSelection();

const minutesArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
    "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

function minutesSelection() {
    let select = document.getElementById("alarmMinutes");
    minutesArr.forEach(element => {
        select.options[select.options.length] = new Option(element);
    });
    select.options[select.selectedIndex].value

}
minutesSelection();

const secondsArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
    "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

function secondsSelection() {
    let select = document.getElementById("alarmSeconds");
    secondsArr.forEach(element => {
        select.options[select.options.length] = new Option(element);
    });
    select.options[select.selectedIndex].value
}
secondsSelection()

function setAlarm() {
    let intlTimesTag = document.getElementById('intlTimes');
    intlTimesTag.removeChild;

    let hr = document.getElementById('alarmHours');
    let min = document.getElementById('alarmMinutes');
    let sec = document.getElementById('alarmSeconds');

    let selHour = hr.options[hr.selectedIndex].value;
    let selMin = min.options[min.selectedIndex].value;
    let selSec = sec.options[sec.selectedIndex].value;

    let alarmTime = `${selHour}:${selMin}:${selSec}`;

    document.getElementById('alarmHours').disabled = true;
    document.getElementById('alarmMinutes').disabled = true;
    document.getElementById('alarmSeconds').disabled = true;
    setInterval(() => {
        if (alarmTime == localTime()) {
            sound.play();
        }
    }, 1000);
}

function clearAlarm() {
    document.getElementById('alarmHours').disabled = false;
	document.getElementById('alarmMinutes').disabled = false;
	document.getElementById('alarmSeconds').disabled = false;
	sound.pause();
}



