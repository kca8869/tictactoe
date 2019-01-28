var container=$(".container");
var welcome=$(".welcome");
var side=$('.side');
var board=$(".board");
var level=$(".level");
var onePlayer=false;
var playerChip="";
var compChip="";
var difficulty="";
var randomVal=true;
container.children().css({"display":"none",
                          "background-color":"rgba(0,0,0,.9);"})
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
  if (!onePlayer) {
    $(this).text(playerChip)
    switchChip();
  }else {
    $(this).text(playerChip);
    aiTurn(e);
  }
}

//make the board
function makeBoard() {
  board.fadeToggle();
  for (var i = 0; i < 9; i++) {
    $("<div class='cell'></div>").click(placeChip).appendTo(board);
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
  $(array[randomI]).text(playerChip);
  console.log(randomI);
}
//AI minimax
function aiTurn(e) {
  console.log(difficulty);
  if (difficulty=="Easy") {
    switchChip();
    easyAi();
    switchChip();
  }
  win();
}
///check for winning conditions//////Start here!!!
function win() {
  if ($(board.children()[0])) {

  }
}

function gameOver() {

}
welcomeLoad();
