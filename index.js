console.log("Tic Tac Toe");


displayScore('N');

//Selecting box element
let box = document.getElementById("uiContainer");

box.addEventListener("click", fun);

var arr = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

function Validate(id)
{
    let mbox = document.getElementById(id);
    if(mbox.innerText.length==0)
    {
        return true;
    }
    else{
        return false;
    }
}

function markBox(id,changeStart){
    let boxes = document.getElementsByClassName("box");
    let count=0,first,second;
    let mBox = document.getElementById(id); 
    // console.log();
    
    for(let i=0;i<9;i++){
        if(boxes[i].innerText.length>0)
            count++;
    }
    if(changeStart%2==0)
    {
        first = 'X';
        second = 'O';
    }
    else{
        first = 'O';
        second = 'X';
    }
    if(count%2==0){
        mBox.innerText = first;
    }
    else {
        mBox.innerText = second;
    }
    if(count%2==0)
        return(first);
    else
        return(second);

}

function formArray(){
    let boxes = document.getElementsByClassName("box");
    let arr = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
 


    for(let i=0;i<9;i++){
        if(boxes[i].innerText.length>0)
        {
            if(boxes[i].innerText==='X')
            {
                let row,col,k=i;
                row = parseInt(k/3);
                col = i - row*3;
                arr[row][col] = 1;
            }
            else if(boxes[i].innerText === 'O')
            {
                let row,col,k=i;
                row = parseInt(k/3);
                col = i - row*3;
                arr[row][col] = 0;
            }
        }
    }
    return arr;


    
    
}

function checkWin(arr,turn)
{
    // console.log(JSON.stringify(arr[0])==JSON.stringify([1,-1,-1]));
    //Checking Horrizontally 
    let val;
    if(turn=='X')
        val = 1;
    else
        val = 0;

    let flag=0,i,j;

    for(i=0;i<3;i++)
    {
        if(JSON.stringify(arr[i])==JSON.stringify([val,val,val]))
        {
            flag=1;
            break;
        }
    }

    if(flag==1)
    {
        return true;
    }

    for(j=0;j<3;j++)
    {
        let a = [arr[0][j],arr[1][j],arr[2][j]];
        if(JSON.stringify(a) == JSON.stringify([val,val,val])){
            flag=1;
            break;
        }
    }

    if(flag==1)
    {
        return true;
    }

    let a = [arr[0][0],arr[1][1],arr[2][2]];
    if(JSON.stringify(a) == JSON.stringify([val,val,val])){
        flag=1;
    }

    if(flag==1)
    {
        return true;
    }

    a = [arr[0][2],arr[1][1],arr[2][0]];
    if(JSON.stringify(a) == JSON.stringify([val,val,val])){
        flag=1;
    
    }

    if(flag==1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkFull(arr){
    count=0;
    let i,j;
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
        {
            if(arr[i][j]>=0){
                count++;
            }
        }
    }

    if(count==9)
    {
        return true;
    }
    else{
        return false;
    }
}

function reset(){
    let boxes = document.getElementsByClassName("box");
    
    for(let i=0;i<9;i++){
        boxes[i].innerText="";
    }
    
}

function displayScore(turn){
    if(localStorage.getItem('player1')===null)
    {
        localStorage.setItem("player1",'0');
    }
    if(localStorage.getItem('player2')===null)
    {
        localStorage.setItem("player2",'0');
    }
    let p1Score = localStorage.getItem('player1');
    let p2Score = localStorage.getItem('player2');

    if(turn == 'X')
    {
        p1Score = Number(p1Score) + 1;
        localStorage.setItem('player1',p1Score);
    }
    else if(turn=='O'){
        p2Score = Number(p2Score) + 1;
        localStorage.setItem('player2',p2Score);
    }

    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");

    p1.innerText = p1Score;
    p2.innerText = p2Score;

}
let changeStart=0;

function fun(e){

    
    if(Validate(e.target.id)){
        let turn = markBox(e.target.id,changeStart);
        let arr = formArray(changeStart);
        let bool = checkWin(arr,turn);        
        if(bool)
        {
            // console.log(`${turn} Won`);
            let result = document.getElementById("result");
            let name=turn=='X'?'Player 1':'Player 2';
            result.innerText = `Congrats ${name} Won`;
            setTimeout(() => {
                result.innerText = ""; 
            }, 3000);
            displayScore(turn);
            reset();
            changeStart+=1;
            
        }
        let full = checkFull(arr);
        if(full && !bool)
        {
            let result = document.getElementById("result");
            result.innerText = `Match Draw, Play Again (:`;
            reset();

            changeStart+=1;

            setTimeout(() => {
                result.innerText = ""; 
            }, 3000);
        }
    }   
}

let btn = document.getElementById("btn");

btn.addEventListener("click",resetScore);

function resetScore()
{
    localStorage.setItem("player1",0);
    localStorage.setItem("player2",0);
    reset();
    changeStart=0;
    displayScore('N');
}