let turnAudio = new Audio("turnChange.mp3");
let gameover = new Audio("GameComplete.mp3");

let turn = "X";

let isStart=false;

//function to change turn
const changeTurn = ()=>{
    return turn === "X" ? "O" : "X";
}


//function to check win
let boxes = document.querySelectorAll(".box");  //collection of all boxes in a array
let isWin=false;  //to check if anyone win or not
const checkWin = ()=>{
    const winPattern=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let pat of winPattern){
        let pos1val=boxes[pat[0]].querySelector(".boxtext").innerText;
        let pos2val=boxes[pat[1]].querySelector(".boxtext").innerText;
        let pos3val=boxes[pat[2]].querySelector(".boxtext").innerText;
        let box1=boxes[pat[0]].querySelector(".boxtext");
        let box2=boxes[pat[1]].querySelector(".boxtext");
        let box3=boxes[pat[2]].querySelector(".boxtext");
        if (pos1val===pos2val && pos2val===pos3val && pos1val===pos3val && pos1val!="" && pos2val!="" && pos3val!=""){
            document.querySelector(".info").innerText=`${pos1val} WIN!`;
            gameover.play();
            isWin=true;
            turnInfo.style.border="3px groove black"
            turnInfo.style.borderRadius="6px";
            turnInfo.style.boxShadow="1px 1px 2px black, 0 0 25px grey, 0 0 5px grey";
            //dull text of all boxes
            for (let box of boxes){
                box.style.color="rgba(171,164,177,0.806)";
            }
            winingEffect(25);
            winingEffect(20);
            //highlight text in which pattern is formed
            setTimeout(()=>{
                box1.style.color="rgb(0, 0, 0)";
                setTimeout(()=>{
                    box2.style.color="rgb(0, 0, 0)";
                    winingEffect(20);
                    setTimeout(()=>{
                        box3.style.color="rgb(0, 0, 0)";
                        winingEffect(20);
                    },350);
                },350);
            },350);

            //after winning the effect working so that user feel good 
            setTimeout(()=>{
                winingEffect(30);
                setTimeout(()=>{
                    winingEffect(30);
                    setTimeout(()=>{
                        winingEffect(10);
                        setTimeout(()=>{
                            winingEffect(10);
                            setTimeout(()=>{
                                winingEffect(10);
                            },2000)
                        },2000)
                    },2000)
                },2000)
            },2000)
        }
        
    }
    if (count==9 && isWin==false){
        document.querySelector(".info").innerText=`GAME DRAW!`;
        turnInfo.style.border="3px groove black"
        turnInfo.style.borderRadius="6px";

    }
}

//Game Logic
let turnInfo=document.querySelector(".turnInfo");
let count=0;  //use this variable to know that if 9 turn complete or not.
for (let box of boxes){
    box.addEventListener("click",()=>{
        let boxtext=box.querySelector(".boxtext");  //access the element where we have to print the player turn
        let turnInfo=document.querySelector(".info");  //access the space or element where we print information regarding player turn, win & draw.

        if (boxtext.innerText=="" && isWin==false && isStart==true){
            boxtext.innerText=turn;  //put the value of turn in the clicked box
            turn=changeTurn();  //change the turn with the help of 'changeTurn' function
            turnInfo.innerText=`Turn of ${turn}`;  //display whose turn
            turnAudio.play();  //play the audio when box is clicked
            count+=1;
            checkWin();
            turnInfo.style.border="3px groove black";
            turnInfo.style.borderRadius="6px";
            setTimeout(()=>{
                turnInfo.style.border="0px solid black";
                setTimeout(()=>{
                    turnInfo.style.border="3px solid black";
                    turnInfo.style.borderRadius="6px";
                    setTimeout(()=>{
                        turnInfo.style.border="0px solid black";
                    },150);
                },150);
            },150);
        }

    })
}

//reset
let reset=document.querySelector("#resetBTN");
reset.addEventListener("click",()=>{
    location.reload();
})

//start playing
let startPlaying=document.querySelector("#startGame");
let heading=document.querySelector(".heading");
let info=document.querySelector(".info");
console.log(info);
startPlaying.addEventListener("click",()=>{
    isStart=true;
    startPlaying.style.display="none";
    reset.style.display="inline";
    heading.style.display="none";
    info.style.display="inline";
})

function winingEffect(x){
    for (i=0;i<x;i+=1){
        let bubble=document.createElement("div");
        bubble.classList.add("bubble");
        document.body.appendChild(bubble);
        bubble.style.left=Math.random()*100+"%";
        bubble.style.backgroundColor=`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
        bubble.style.borderRadius=`${Math.random()*100}%`;
        let x=Math.random()*3;
        bubble.style.animation=`fall ${x}s linear`;
        setTimeout(()=>{
            bubble.remove();
        },x*1000);
    }
}