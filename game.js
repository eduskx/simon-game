const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var turnTimeout = 500;

// click starts game
$(".play-row").one("click", function() {
    $(".play-row").hide();
    nextSequence();
});


// adds new color to the game pattern
function nextSequence() {
    $(".btn").off("click");
    $("h1").html(`LEVEL ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    async function showSequence() {
        for (let i = 0; i < gamePattern.length; i++) {
            // console.log(i, gamePattern.length, gamePattern);
            $(`#${gamePattern[i]}`).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
            await sleep(500);
            turnTimeout += 500;
            console.log(turnTimeout);
        } 
        
        //console.log(turnTimeout)
    }
    
    showSequence();
    console.log("this in func " +turnTimeout);
    setTimeout(function() {
        activateClicks();
    }, turnTimeout);
    turnTimeout = 500;
}


// makes buttons clickable
function activateClicks() {
    $(".btn").on("click", function(event) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    });
}





function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            console.log("full success")
            level++;
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        $(".btn").off("click");
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    $(".btn").off();
    $(".play-row").show();
    $("h2").html("PLAY AGAIN");
    $("h1").html(`GAME OVER! <br /> SCORE: ${level-1}`);

    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    turnTimeout = 500;


    $(".play-row").one("click", function() {
        $(".play-row").hide();
        nextSequence();
    })
}




// ///////////////////////////////////////////////////////////////////////

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.volume = 0.1;
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

