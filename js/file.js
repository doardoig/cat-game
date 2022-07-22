const pageElements = {
    container: document.querySelector("#container"),
    cat: document.querySelector("#cat"),
    road: document.querySelector("#road"),
    cloud: document.querySelector("#cloud"),
    score: document.querySelector("#score"),
    gameOver: document.querySelector("#gameOver"),
    block: document.querySelector("#block"),
}

const score = {
    interval: null,
    playerScore: 0,
}

const hideGameOverText = () => {
    pageElements.gameOver.style.display = "none";
}

const showGameOverText = () => {
    pageElements.gameOver.style.display = "block";
}

const enableObstacleAnimation = () => {
    block.classList.add("blockActive");
}

const disableObstacleAnimation = () => {
    pageElements.block.classList.remove("blockActive");
}

const enableRoadAnimation = () => {
    pageElements.road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
}

const disableRoadAnimation = () => {
    pageElements.road.firstElementChild.style.animation = "none";
}

const enableCloudAnimation = () => {
    pageElements.cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";
}

const disableCloudAnimation = () => {
    pageElements.cloud.firstElementChild.style.animation = "none";
}

const increaseScore = () => {
    score.playerScore++;
    pageElements.score.innerHTML = `Score <b>${score.playerScore}</b>`;
}

const enableScore = () => {
    score.playerScore = 0;
    score.interval = setInterval(increaseScore, 200);
}

const disableScore = () => {
    clearInterval(score.interval);
    score.playerScore = 0;
}

const isGameOver = () => {
    const catBottomPosition = parseInt(getComputedStyle(pageElements.cat).getPropertyValue("bottom"));
    const obstacleLeftPosition = parseInt(getComputedStyle(block).getPropertyValue("left"));
    return catBottomPosition <= 90 && obstacleLeftPosition >= 20 && obstacleLeftPosition <= 145;
}

let statusIntervalID;

const stopGameStatusTracking = () => {
    clearInterval(statusIntervalID)
}

const setupGameOver = () => {
    disableCloudAnimation();
    disableObstacleAnimation();
    disableRoadAnimation();
    disableScore();
    showGameOverText();
    stopGameStatusTracking();
}

const trackGameStatus = () => {
    statusIntervalID = setInterval(() => {
        if (isGameOver()) {
            setupGameOver();
        }
    }, 10);
}

const onInitGame = () => {
    enableCloudAnimation();
    enableObstacleAnimation();
    enableRoadAnimation();
    enableScore();
    hideGameOverText();
    trackGameStatus();
}

const onCharacterJump = () => {
    const catActiveClass = "catActive";
    const catClassList = pageElements.cat.classList
    if (!catClassList.contains(catActiveClass)) {
        catClassList.add(catActiveClass);
        setTimeout(() => {
            catClassList.remove(catActiveClass);
        }, 500);
    }
}

const onKeyPress = (event) => {
    if (event.key == "ArrowUp") {
        onCharacterJump();
    }
    if (event.code == "Space") {
        onInitGame();
    }
}

window.addEventListener("keydown", onKeyPress);
  