var container=$(".container");
var welcome=$(".welcome");
var side=$('.side');
var board=$(".board");
var level=$(".level");
var winner=$(".winner");
var onePlayer=false;
var playerChip="";
var compChip="";
var difficulty="";
var gameEnd=false;

var randomVal=true;
function reset() {
  container.children().empty().css({"display":"none",
                            "background-color":"rgba(0,0,0,.9);"})
}

//give a 50% chance of returning true or false
function random() {
  if (Math.random()>.5) {
    return true;
  } else {
    return false;
  }
}
//switch playerChip
function switchChip() {
  if (playerChip=="X") {
    playerChip="O";
    compChip="X"
  }else{
    playerChip="X"
    compChip="O";
  }
}
//clear board
function sideLoad(){
  side.fadeToggle();
  $("<h1 class='selector'>Do you want to be X or O?</h1>").appendTo(side);
  $("<div><p class='selector link' id='X'>X</p><p class='selector link' id='O'>O</p></div>").appendTo(side).children().click(function (e) {
    playerChip=e.currentTarget.id;
    if (playerChip=="X") {
      compChip="O";
    }else{
      compChip="X";
    }
    side.fadeToggle(400,function () {
      makeBoard();
    });
  });
}
//welcome prompt
function welcomeLoad(){
  randomVal=random();
  welcome.fadeToggle()
  $("<h1 class='selector'>Tic-Tac-Toe</h1>").appendTo(welcome);
  $("<h1 class='selector link'>One Player</h1>").click(function () {
    onePlayer=true;
    welcome.fadeToggle(400,function () {
      diffLoad();
      });
    }).appendTo(welcome);
  $("<h1 class='selector link'>Two Players</h1>").click(function (e) {
    onePlayer=false;
    goToSideLoad(e);
  }).appendTo(welcome);
}


function placeChip(e) {
  if ($(this).text()=="") {
    if (!onePlayer) {
      $(this).css({"color":"black"}).text(playerChip);
      var test=win();
      if (test) {
        gameOver(test);
      }
      switchChip();

    }else {
      $(this).css({"color":"black"}).delay(400).text(playerChip).fadeIn(400,function () {
        var test=win();
        if (test) {
          gameOver(test);
        }
       if (!gameEnd) {
          aiTurn();
       }

      });
    }
  }
}

//make the board
function makeBoard() {
  board.fadeToggle();
  for (var i = 0; i < 9; i++) {
    $("<div class='cell'></div>").css({"color":"transparent","transition":"all 1s"}).click(placeChip).appendTo(board);
  }
  if (onePlayer&&randomVal) {
    aiTurn();
  }
};

function goToSideLoad(e) {
  if (onePlayer) {
    difficulty=$(e.currentTarget).text();
  }
  $(e.currentTarget).parent().fadeToggle(400,function () {
    sideLoad();
    });
}

function diffLoad() {
  level.fadeToggle();
  $("<h1 class='selector'>Difficulty</h1>").appendTo(level);
  $("<h1 class='selector link'>Easy</h1>").click(goToSideLoad).appendTo(level);
  $("<h1 class='selector link'>Medium</h1>").click(goToSideLoad).appendTo(level);
  $("<h1 class='selector link'>I don't want to win</h1>").click(goToSideLoad).appendTo(level);
}
function easyAi() {
  var array=[];
  for (var i = 0; i < board.children().length; i++) {

    if ($(board.children()[i]).text()=="") {
      array.push(board.children()[i]);
    }
  }
  var randomI=Math.floor(Math.random()*array.length);
  $(array[randomI]).css({"color":"black"}).text(playerChip);
}

function medAi() {
  var array=[];
  var index="a";
  //make an array of only empty cells
  for (var i = 0; i < board.children().length; i++) {
    if ($(board.children()[i]).text()=="") {
      array.push(board.children()[i]);
    }
  }
  //place chip in each cell and check for winning conditions
  //if found, save the index
  for (var i = 0; i < array.length; i++) {
    $(array[i]).text(playerChip)
      if (win()) {
        index=i;
      }
    $(array[i]).text("");
    }
    //place the other chip in each cell and check for winning conditions agian
    //if found save the index
    if (index=="a") {
      switchChip();
        for (var i = 0; i < array.length; i++) {
          $(array[i]).text(playerChip)
          if (win()) {
              index=i;
          }
          $(array[i]).text("");
        }
      switchChip();
    }
  //if a winning condition was found play the index to win or block win
  //if no winning condition was found, play a random cell
  //console.log(index, array);
    if (index=="a") {
      var randomI=Math.floor(Math.random()*array.length);
      $(array[randomI]).css({"color":"black"}).text(playerChip);
    }else{
      $(array[index]).css({"color":"black"}).text(playerChip);
    }
  }
function hardAi() {
  var best=miniMax(compChip);
  //console.log(best)
  var array=[];
  for (var i = 0; i < board.children().length; i++) {
    if ($(board.children()[i]).text()=="") {
      array.push(board.children()[i]);
    }
  }
  $(array[best.index]).css({"color":"black"}).text(compChip);
}

//AI minimax
function miniMax(chip) {
  var moves=[];
  var array=[];
  var index="a";
  //make an array of only empty cells
  for (var i = 0; i < board.children().length; i++) {
    if ($(board.children()[i]).text()=="") {
      array.push(board.children()[i]);
    }
  }

  //shortcut--if the ai goes first the postion is just givin rather than force it to caculate
  if (array.length==9) {
    return {index:0};
  }
//  console.log(chip, playerChip);
  for (var i = 0; i < array.length; i++) {
    $(array[i]).text(chip)
    var test=win()
      if (test) {
      //  console.log(chip, test, playerChip);
        if (test==compChip+" Wins!") {
          $(array[i]).text("");
          return {score:10,
                  index:i}
        }else if (test==playerChip+" Wins!") {
          $(array[i]).text("");
          return {score:-10,
                  index:i}
        }
        else if (test=="Cat's Game") {
          $(array[i]).text("");
          return {score:0,
                  index:i}
        }

      }else{

        if (chip==compChip) {
          var move=miniMax(playerChip)
        }else {
           var move=miniMax(compChip)
        }
      moves.push({index:i,
                  score:move.score})
      }
    $(array[i]).text("");
    }
  //  console.log(moves);
    if (chip==compChip) {
      var bestScore=-10000;
      var bestMove="";
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score>bestScore) {
          bestScore=moves[i].score;
          bestMove=i;
        }
      }
    }else{
      var bestScore=10000;
      var bestMove="";
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score<bestScore) {
          bestScore=moves[i].score;
          bestMove=i;
        }
      }
    }
    return moves[bestMove];
}
//select which function to run based on difficulty option selected
function aiTurn(e) {
  switch (difficulty) {
    case "Easy":
    switchChip();
    easyAi();
    switchChip();
      break;
    case "Medium":
    switchChip();
    medAi();
    switchChip();
      break;
    case "I don't want to win":
    hardAi();
      break;
  }
  var test=win();
  if (test) {
    gameOver(test);
  }
}
///check for winning conditions
function win() {

  if (($(board.children()[0]).text()=="X")&&($(board.children()[1]).text()=="X")&&($(board.children()[2]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[3]).text()=="X")&&($(board.children()[4]).text()=="X")&&($(board.children()[5]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[6]).text()=="X")&&($(board.children()[7]).text()=="X")&&($(board.children()[8]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[0]).text()=="X")&&($(board.children()[4]).text()=="X")&&($(board.children()[8]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[2]).text()=="X")&&($(board.children()[4]).text()=="X")&&($(board.children()[6]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[0]).text()=="X")&&($(board.children()[3]).text()=="X")&&($(board.children()[6]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[1]).text()=="X")&&($(board.children()[4]).text()=="X")&&($(board.children()[7]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
  if (($(board.children()[2]).text()=="X")&&($(board.children()[5]).text()=="X")&&($(board.children()[8]).text()=="X")) {
    // gameOver("X Wins!");
    return "X Wins!";
  }
//"o" starts here
  if (($(board.children()[0]).text()=="O")&&($(board.children()[1]).text()=="O")&&($(board.children()[2]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[3]).text()=="O")&&($(board.children()[4]).text()=="O")&&($(board.children()[5]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[6]).text()=="O")&&($(board.children()[7]).text()=="O")&&($(board.children()[8]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[0]).text()=="O")&&($(board.children()[4]).text()=="O")&&($(board.children()[8]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[2]).text()=="O")&&($(board.children()[4]).text()=="O")&&($(board.children()[6]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[0]).text()=="O")&&($(board.children()[3]).text()=="O")&&($(board.children()[6]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[1]).text()=="O")&&($(board.children()[4]).text()=="O")&&($(board.children()[7]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (($(board.children()[2]).text()=="O")&&($(board.children()[5]).text()=="O")&&($(board.children()[8]).text()=="O")) {
    // gameOver("O Wins!");
    return "O Wins!";
  }
  if (boardFull()) {
    return "Cat's Game";
    // gameOver("Cat's Game");
  }
}

function boardFull() {
  var array=[];
  for (var i = 0; i < board.children().length; i++) {
    array.push(board.children()[i]);
  }
  array=array.filter(function (value) {
    return $(value).text();
  })
  if (array.length==9) {
    return true;
  }
}

function gameOver(winChip) {
  gameEnd=true;
  winner.fadeToggle()
    $("<h1 class='selector link'>"+winChip+"</h1>").click(function() {
      winner.fadeToggle(400,function () {
        board.fadeToggle();
        reset();
        welcomeLoad();
        gameEnd=false;
      })
    }).appendTo(winner);
}
reset();
welcomeLoad();
