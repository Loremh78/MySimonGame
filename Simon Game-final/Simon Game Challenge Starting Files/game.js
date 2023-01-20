//paso1
var colors = ["red", "blue", "green", "yellow"]; //(paso 1-a)
var gameSequence = []; //(paso 1-b)
var userSequence = []; //(paso 1-c)
var level = 0; //(paso 1-d)

var started = false; //(paso 4-a)

//paso 2
function nextStepSequence() { //(paso 4)
  level++; //(paso 5-1)
  $("h1").text("Level " + level); //(paso 5-2)
  userSequence = [];

  var randomNumber = Math.floor(Math.random() * 4); //(paso 2-2)
  var randomColor = colors[randomNumber]; //(paso 2-3)

  gameSequence.push(randomColor);//(paso 2-4)

  //paso 3
  $("#" + randomColor)
    .fadeIn(100) //(paso 3-2)
    .fadeOut(100) //(paso 3-2)
    .fadeIn(100); //(paso 3-2)

  playSound(randomColor); //(también paso 7-2)
}

//(paso 10)
$(document).keydown(function () {
  if (!started) {
    nextStepSequence();
    started = true;
  }
});

$("div.btn").click(function () { //(paso 6-1)
  var userChoosenColor = this.id; //(paso 6-2)
  userSequence.push(userChoosenColor); //(paso 6-3)
  playSound(userChoosenColor); //(paso 7-1)
  animatePress(userChoosenColor); //(paso 8-1)
  checkAnswer(); //(paso 9a)
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3"); //(paso 7)
  audio.play(); 
}

//(paso 8-1)
function animatePress(color) {
  $("#" + color).addClass("pressed"); //(paso 8-2)
  setTimeout(function () { //(paso 8-3)
    $("#" + color).removeClass("pressed");
  }, 100);
}

//(paso 9-a)
function checkAnswer() {
  var lastPosition = userSequence.length - 1;

  //(paso 9a-3)
  if (userSequence[lastPosition] === gameSequence[lastPosition]) {
    //(paso 9b-1)
    if (userSequence.length === gameSequence.length) {
      setTimeout(function () {
        nextStepSequence();
      }, 1000);
    }
  } else {
    playSound("wrong"); //(paso9b-3)
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart"); //(paso 9b-4)
    startOver(); //(paso10)
  }
}

//(paso 10)
function startOver() {
  level = 0;
  started = false;
  gameSequence = [];
}
