letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var available = letters;
var fullAnswer = null;
var chosen = null;
var myBlanksMine = "";

level1 = ["CAT","FEZ","JOB","VAN","TOP","DOG","BOX"];
level2 = ["GREAT","FORESTS","STREETS","CIRCLE","CANDLE"];
level3 = ["PALINDROME","FOREIGNER","COMPROMISE","TREASON"];
level4 = ["TO BE OR NOT TO BE","ONE IN THE HAND","I WONDER WHILE I WANDER"];
solutions = Object();
solutions = {
    values: [level1,level2,level3,level4],
    displays: ["level1","level2","level3","level4"]
};

function loadStuff() {
    makeTheLetters();
    makeTheSolutions();
}//loads the letters and stuff
function runHangMan() {
    if(document.getElementById("selectLevel").selectedIndex !== 0) {
        document.getElementById("error").innerHTML = "";
        makeRandomSolution();
        makeBlanks(fullAnswer);
        available = letters;
        makeTheLetters();
        makeLives();
    } else {
        document.getElementById("error").innerHTML = "You didn't select a level.";
        fullAnswer = null;
        getAndPutInner("blanks","");
        available = letters;
    }
}//starts the game with blanks, answer, and level
function tryLetter() {
    if(document.getElementById("blanks").innerHTML !== "") {
        var selectL = document.getElementById("selectLetters");
        chosen = selectL[selectL.selectedIndex].value;
        console.log(chosen + " is the letter you chose.");
        AppearInBlanks(chosen);//if the letter is in the blanks it appears
        takeOutOfSelect();
        loseOrWin();
    }
}//edits the available letters, the select menu, and the blanks
function makeRandomSolution() {
    // var possibleAnswers = solutions.values[document.getElementById("selectLevel").selectedIndex - 1];
    // var lengthAnswer = possibleAnswers.length;
    // var randNum1 = Math.floor(Math.random() * lengthAnswer);
    // console.log(possibleAnswers[randNum1]);
    // fullAnswer = possibleAnswers[randNum1]);
    fullAnswer = solutions.values[document.getElementById("selectLevel").selectedIndex - 1][Math.floor(Math.random() * solutions.values[document.getElementById("selectLevel").selectedIndex - 1].length)];
    console.log(fullAnswer + " is the answer to the problem.");
}//fullAnswer is set to a random answer equal to the level
function makeTheLetters() {
    getAndPutInner("selectLetters","");
    getAndPutInnerAdd("selectLetters","<option value='none'>Select a letter</option>");
    for(var i in letters) {
        if(letters.hasOwnProperty(i)) {
            getAndPutInnerAdd("selectLetters", "<option value='" + letters[i] + "'>" + letters[i] + "</option>");
        }
    }
}//makes the letters in the select
function makeTheSolutions() {
    for(var o in solutions.displays) {
        getAndPutInnerAdd("selectLevel", "<option value='" + solutions.displays[o] + "'>" + solutions.displays[o] + "</option>")
    }
}//makes the level select
function getAndPutInnerAdd(id,stuffToPutIn) {
    document.getElementById(id).innerHTML += stuffToPutIn;
}//add an innerHTML to a doc
function getAndPutInner(id,stuffToPutIn) {
    document.getElementById(id).innerHTML = stuffToPutIn;
}//replace an innerHTML in a doc
function makeBlanks(wordAnswer) {
    var blanks = "";
    var myBlanks = "";
    var arrWord = wordAnswer.split("");
    for(var e = 0; e < wordAnswer.length; e ++) {
        if(arrWord[e] !== " ") {
            blanks += " _ ";
        } else {
            blanks += "&nbsp;";
        }
    }
    for(var f = 0; f < wordAnswer.length; f ++) {
        if(arrWord[f] !== " ") {
            myBlanks += " _ ";
        } else {
            myBlanks += " 0 ";
        }
    }
    console.log(blanks + " is what the blanks look like.");
    console.log(myBlanks);
    getAndPutInner("blanks",blanks);
    myBlanksMine = myBlanks;
}//just makes the blanks for the game when given a string
function takeOutOfSelect() {
    var x = document.getElementById("selectLetters");
    x.remove(x.selectedIndex);
}//takes the chosen letter out of the select menu
function AppearInBlanks(letter) {
    console.log(fullAnswer + " is the answer.");
    if(fullAnswer.indexOf(letter) === -1) {
        lifeOrLose();
    } else {
        while(fullAnswer.indexOf(letter) !== -1) {
            console.log("This letter is in the answer.");
            var indInAnswer = fullAnswer.indexOf(letter);
            var indInBlank = indInAnswer * 3;
            fullAnswer = fullAnswer.slice(0,indInAnswer) + "_" + fullAnswer.slice(indInAnswer + 1);
            var blanks = myBlanksMine;
            blanks = blanks.slice(0,indInBlank + 1) + letter + blanks.slice(indInBlank + 2);
            myBlanksMine = blanks;
        }
        console.log(fullAnswer);
        console.log(myBlanksMine);
        var blanksToNew = myBlanksMine;
        while(blanksToNew.indexOf("0") !== -1) {
            var bl = blanksToNew.indexOf("0");
            blanksToNew = blanksToNew.slice(0,bl - 1) + "&nbsp" + blanksToNew.slice(bl + 2);
        }
        console.log(blanksToNew);
        document.getElementById("blanks").innerHTML = blanksToNew;
    }
}//makes the chosen letter appear in the blanks
function loseOrWin() {
    if(document.getElementById("blanks").innerHTML.indexOf("_") === - 1 && document.getElementById("lives").innerHTML !== "") {
        console.log("WINNER");
        getAndPutInner("blanks","");
        getAndPutInner("error","You've Won!");
    }
}//makes the winning statement if the letters are there and lives are not zero
function lifeOrLose() {
    var lives = document.getElementById("lives").innerHTML;
    lives = lives.slice(0,lives.length - 6);
    if(lives === "") {
        getAndPutInner("blanks","");
        getAndPutInner("error","You Lost!");
    }
    document.getElementById("lives").innerHTML = lives;
}//makes a losing statement
function makeLives() {
    var myLevel = document.getElementById("selectLevel").selectedIndex;
    console.log(myLevel);
    if(myLevel === 1) {
        getAndPutInner("lives","<3 <3 <3 <3 <3 <3 ");
    } else if(myLevel === 2) {
        getAndPutInner("lives","<3 <3 <3 <3 <3 ");
    } else if(myLevel === 3) {
        getAndPutInner("lives","<3 <3 <3 <3 ");
    } else {
        getAndPutInner("lives","<3 <3 <3 ");
    }
}