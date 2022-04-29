const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#btn-start')
const buttons = document.querySelectorAll('.btn');
const lvlEasy = document.querySelector('#easy-btn')
const lvlMedium = document.querySelector('#medium-btn')
const lvlExpert = document.querySelector('#expert-btn')

let lastHole; 
let timeUp = false
let score = 0;
let minTime = 800;
let maxTime = 1400;

function LVLOne () {
    lvlMedium.classList.remove('btn-active')
    lvlExpert.classList.remove('btn-active')
    lvlEasy.classList.add('btn-active')
    minTime = 800;
    maxTime = 1400;
}
function LVLTwo () {
    lvlExpert.classList.remove('btn-active')
    lvlEasy.classList.remove('btn-active')
    lvlMedium.classList.add('btn-active')
    minTime = 500;
    maxTime = 1200;
}
function LVLThree () {
    lvlMedium.classList.remove('btn-active')
    lvlEasy.classList.remove('btn-active')
    lvlExpert.classList.add('btn-active')
    minTime = 400;
    maxTime = 800;
}

lvlEasy.addEventListener('click', LVLOne)
lvlMedium.addEventListener('click', LVLTwo)
lvlExpert.addEventListener('click', LVLThree)

function randomTime (min, max){
    return Math.floor(Math.random() * (max - min) + min) 
}

function randomHole (holes) {
    const idx = Math.floor(Math.random() * holes.length)
    const hole = holes[idx]
    if(hole === lastHole) {
        return randomHole(holes)
    }
    lastHole = hole
    return hole
}

function PopUp () {
    const time = randomTime(minTime, maxTime);
    const hole = randomHole(holes); 
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up')
        if(!timeUp) PopUp()
    }, time);
}   

function startGame () {
    scoreBoard.textContent = 0; 
    timeUp = false
    PopUp()
    startBtn.disabled = true;
    buttons.forEach(btn => btn.disabled = true)
    setTimeout(() => {
        timeUp = true
        startBtn.disabled = false;
        buttons.forEach(btn => btn.disabled = false)
        score = 0
    }, 10000);
}

function Catch (e) {
    if(!e.isTrusted) return
    console.log(e);
    score++; 
    this.classList.remove('up')
    scoreBoard.textContent = score
}

startBtn.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', Catch));
