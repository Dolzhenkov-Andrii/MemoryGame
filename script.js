function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getColour() {
    let col = "#";
    for (var i = 0; i < 6; i++) {
        if (Math.random() < 0.5) {
            col += liters[getRandomInt(3)];
        } else {
            col += getRandomInt(10);
        }
    }
    return col;
}
class Step {
    constructor() {
        this.current = 0;
        this.step = document.getElementById("step");
    }
    currentStep() {
        this.step.textContent = `Step: ${this.current}`;
    }
    addStep() {
        this.current += 1;
        this.currentStep();
    }
    resetCurrentStep() {
        this.current = 0;
        this.currentStep();
    }
}
class TimeGame {
    constructor() {
        this.min = 0;
        this.sec = 0;
        this.timer = document.getElementById("timer");
        this.but = true;
    }
    getTime() {
        let min = this.min > 9 ? this.min : `0${this.min}`;
        let sec = this.sec > 9 ? this.sec : `0${this.sec}`;
        this.timer.textContent = `${min}:${sec}`;
    }
    timeStart() {
        const getTimes = () => {
            if (this.but) {
                if (this.sec < 59) {
                    this.sec += 1;
                } else {
                    this.min += 1, this.sec = 0;
                }
                this.getTime();
                setTimeout(getTimes, 1000);
            }
        }
        setTimeout(getTimes, 1000);
    }
    timeEnd() {
        this.but = false;
    }
    resetTimer() {
        this.min = 0;
        this.sec = 0;
        this.getTime();
    }
}



const userStep = new Step();
const liters = ["A", "F", "C"];
const colorBox = [];
for (var i = 0; i < 16; i += 2) {
    colorBox.push(getColour());
    colorBox.push(colorBox[i]);
}
for (var i = 0; i < 100; i++) {
    let tmp = colorBox.splice(getRandomInt(
        16), 1)[0];
    colorBox.splice(getRandomInt(16), 0, tmp);
}

const gameBord = [];
for (var i = 0; i < colorBox.length; i++) {
    gameBord.push(0);
}

const colorOne = {
    id: null,
};
const colorTwo = {
    id: null,
};



let tmp = 0;
const theTimer = new TimeGame();

async function updateCol(numb) {
    const blockBox = document.getElementById("block");
    const id = numb;
    if (!gameBord[id]) {
        if (userStep.current === 0) {
            theTimer.timeStart();
        }
        if (colorOne.id == null) {
            const box = document.getElementById(id + 1);
            box.style.backgroundColor = colorBox[id];
            userStep.addStep();
            colorOne.id = id;
        } else if (colorOne.id != id) {
            const box = document.getElementById(id + 1);
            box.style.backgroundColor = colorBox[id];
            colorTwo.id = id;
            if (colorBox[colorOne.id] == colorBox[colorTwo.id]) {
                gameBord[colorOne.id] = 1;
                gameBord[colorTwo.id] = 1;
                tmp += 1;
                blockBox.style.zIndex = 2;
            } else {
                blockBox.style.zIndex = 2;
                await sleep(1000);
                const boxOne = document.getElementById(colorOne.id + 1);
                boxOne.style.background = "white";
                const boxTwo = document.getElementById(colorTwo.id + 1);
                boxTwo.style.background = "white";
            }
            colorOne.id = null;
            colorTwo.id = null;
        }
        blockBox.style.zIndex = 0;
    }
    if (tmp == 8) {
        theTimer.timeEnd();
    }
}
