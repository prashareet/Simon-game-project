var buttonColours =["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern =[];

var started =false;
var level = 0;

function nextSequence(){
    userClickedPattern =[];
    level++;
    //changing the h1 text:
    $("h1").text("Level " + level);
    var randomNumber = (Math.floor(Math.random()*4));
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //adding animation to the randomChosenColour:
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}
$(".btn").on("click", function(event){
    
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    //Playing the sound and the necessary animation when user clicks on the button.
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //Checking the answer whether the clicked button is same as the gamePattern;
    checkAnswer(userClickedPattern.length-1);

    

})

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}
//Keypress
$(document).on("keydown" , function(){
    if(!started){
        $("h1").text("Level "+ level);
        $("h2").text("");
        nextSequence();
        started = true;
    }
})
function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}
function checkAnswer(currentLevel){
    var answer;
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        answer="right"
        //
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    //
    else{
        answer= "wrong";
        $("body").addClass("game-over")
        playSound("wrong");

        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
        $("h1").text("Game over! Press any key to restart.");
        startOver();

    }


}