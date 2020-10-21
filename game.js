var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var keypressed = false;
var level=0;

$(document).on("keydown", function(){
    if(keypressed === false){
        nextSequence();
    }
});
               
    
function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    $("h1").html("level " + level);
    level++;
    keypressed = true;
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);    
});


function playSound(name){
   var audio = new Audio ("sounds/" + name + ".mp3");
   audio.play(); 
}

function animatePress(currentColour){
    var activeButton= $("." + currentColour);
    activeButton.addClass("pressed");
    
    setTimeout(function(){
        activeButton.removeClass("pressed");
    }, 100); 
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            },1000);
            
        }
    } else {
        var audio = new Audio ("sounds/wrong.mp3");
        audio.play(); 
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            },200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }   
}

function startOver(){
    keypressed = false;
    level=0;
    gamePattern = [];
}