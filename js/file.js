let pageElements = {
    container: document.querySelector("#container"),
    cat: document.querySelector("#cat"),
    road: document.querySelector("#road"),
    cloud: document.querySelector("#cloud"),
    score: document.querySelector("#score"),
    gameOver: document.querySelector("#gameOver"),
    block: document.querySelector("#block"),
}

let score = {
    interval: null,
    playerScore: 0,
}



//função do score
let scoreCounter = () => {
    score.playerScore++;
    pageElements.score.innerHTML = `Score <b>${score.playerScore}</b>`;
}


//inicio de jogo
window.addEventListener("keydown", (start) => {
    //    console.log(start);
    if (start.code == "Space") {
        pageElements.gameOver.style.display = "none";
        block.classList.add("blockActive");
        pageElements.road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
        pageElements.cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";

        //score
        score.playerScore = 0;
        score.interval = setInterval(scoreCounter, 200);
    }
});


//pulo do personagem
window.addEventListener("keydown", (e) => {
    //    console.log(e);

    if (e.key == "ArrowUp")
        if (pageElements.cat.classList != "catActive") {
            pageElements.cat.classList.add("catActive");

            //                remove class após 0,5 segundos
            setTimeout(() => {
                pageElements.cat.classList.remove("catActive");
            }, 500);
        }
});

//'Game Over' se o 'Character' bater no 'Block' 
let result = setInterval(() => {
    let catBottom = parseInt(getComputedStyle(pageElements.cat).getPropertyValue("bottom"));
    //    console.log("catBottom" + catBottom);

    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    //    console.log("BlockLeft" + blockLeft);

    if (catBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
        //        console.log("Game Over");

        pageElements.gameOver.style.display = "block";
        pageElements.block.classList.remove("blockActive");
        pageElements.road.firstElementChild.style.animation = "none";
        pageElements.cloud.firstElementChild.style.animation = "none";
        clearInterval(score.interval);
        score.playerScore = 0;
    }
}, 10);
