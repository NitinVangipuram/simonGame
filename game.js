var buttonColours =["red", "blue","green","yellow"];
var gamePattern =[];
var userClickedPattern=[];
var level = 0;
var started = false;
function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.random();
  randomNumber= randomNumber*4;
  randomNumber=Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level "+level);
  level = level+1;
}
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
 
  checkAnswer(userClickedPattern.length-1);
})
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(CurrentColour){
$("#"+CurrentColour).addClass("pressed");
setTimeout(function(){
  $("#"+CurrentColour).removeClass("pressed");
},100)
}
$(document).keypress(function(){
   if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
   }
   
 
})
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    
    startOver();
  }

}
function startOver(){
  level =0;
  gamePattern=[];
  started=false;
}