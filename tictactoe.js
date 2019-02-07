let game = {
    player : 1,
    spaceCount: 0,
    arr: [[, , ,], [, , ,], [, , ,]]
}

game.arr.forEach(el=>{
    game.arr.forEach(el=>{
        el.fill(-1);
    })
})

console.log(game.arr);

function Parsing(event){

        let parseData ={};
        parseData.id = event.target.getAttribute('id');
        //parsing id getting from html button ids
         parseData.i = Number.parseInt(parseData.id.charAt(0));
        parseData.j = Number.parseInt(parseData.id.charAt(1));
        console.log(parseData);
        return parseData;
    
    }
function init(){

        //event listner for all teh buttons
        document.querySelector('.parent').addEventListener('click', (event)=>{
        game.spaceCount++;
        let className = event.target.getAttribute('class');
        if(className === 'add_btn'){
              //getting parseData from parsing() function
            let parseData= Parsing(event);
            if(game.spaceCount === 9){
            alert("match drawn");
        }
        else{
             GameRules(parseData);
        }
    }
}
);
}

function GameRules(parseData){
    let check;
    if(game.player === 1){
        document.getElementById(`${parseData.id}`).style.backgroundColor= 'Green';
        
         console.log(`player ${game.player} clicked at position: (${parseData.i}, ${parseData.j})`);
         game.arr[parseData.i][parseData.j] = 0;
         document.getElementById(`${parseData.id}`).innerHTML= '0';
         document.getElementById(`${parseData.id}`).disabled = true;
         document.getElementById(`${parseData.id}`).style.cursor= 'not-allowed';
         document.getElementById(`${parseData.id}`).style.backgroundColor= 'Green';
         
         
         //checking if player match the winning criteria
         check = isWinner(parseData.i, parseData.j, game.player);
         console.log(check);
         if(check){
            alert(`Player  ${game.player } is WINNER`);
         }
        //changing player turn
         game.player = 2;
}else if(game.player  === 2){
        console.log(`player ${game.player} clicked at position: (${parseData.i}, ${parseData.j})`);
        game.arr[parseData.i][parseData.j] = 1;
        document.getElementById(`${parseData.id}`).innerHTML= 'x';
        document.getElementById(`${parseData.id}`).disabled = true;
        document.getElementById(`${parseData.id}`).style.cursor= 'not-allowed';
        document.getElementById(`${parseData.id}`).style.backgroundColor = 'Red';
        
         //checking if player match the winning criteria
         check = isWinner(parseData.i, parseData.j, game.player);
         console.log(check);
         if(check){
             alert(`Player  ${game.player} is WINNER`);
        }
         //switchting player
        game.player = 1;
    }
}

function valueOf(player){
let value;
    player === 1 ? value = 0 : value = 1;
    return value;
}

function diagnoal(player){
      let value, bol;
      value =  valueOf(player);
    //checking if player is passing diagnoal rule or not
      if(game.arr[0][0] === value && game.arr[1][1] === value && game.arr[2][2] === value)
      {
        return true;
    }else{
        return false;
    }
  }

function vertical(vl, player){
    let value, bol;
    value =  valueOf(player);
    if(game.arr[0][vl] === value &&  game.arr[1][vl] === value && game.arr[2][vl] === value){
        bol = true;
    }
    else{
        bol = false;
    }
        return bol; 
}


function horizontal(hl, player){
    let value, bol;
    value =  valueOf(player);
    if(game.arr[hl][0] === value &&  game.arr[hl][1] === value && game.arr[hl][2] === value){
        bol = true;
    }
    else{
        bol = false;
    }
    return bol; 
}

function isWinner(hl , vl,  player){

    let d  = diagnoal(player);
    let h =horizontal(hl, player);
    let v = vertical(vl, player);
    if(d || h || v){

        return true;
    }else{
        return false;
    }
}

init();