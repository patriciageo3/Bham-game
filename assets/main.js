window.onload = function() {
	const holes = document.querySelectorAll(".hole");
	const moles = document.querySelectorAll(".mole");
	const scoreContainer = document.querySelector("#score");
	const startBtn = document.querySelector("#start_btn");
	const messageContainer = document.querySelector(".message_container");
	let lastHole;
	let timeUp = false;
	let score = 0;

	function randomTime(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function randomHole(arr) {
		const index = Math.floor(Math.random() * arr.length);
		const hole = arr[index];
		if (lastHole === hole) {
			return randomHole(arr);
		}
		lastHole = hole;
		return hole;
	}

	function moleAppears() {
		const time = randomTime(200, 1000);
		const hole = randomHole(holes);
		hole.classList.add("appear");
		setTimeout(() => { 
			hole.classList.remove("appear");
			if (!timeUp) {
				moleAppears();
			} else {
				let finishMessage = document.createElement("p");
				finishMessage.textContent = "Your time is up!";
				finishMessage.className = "finish";
				messageContainer.appendChild(finishMessage);
				startBtn.innerHTML = "Restart Game";
			}
		}, time);
	}

	function startGame() {
		startBtn.innerHTML = "Start Game";
		// Remove finish game message, if game has been restarted
		messageContainer.childNodes[0] && messageContainer.removeChild(messageContainer.childNodes[0]);
		scoreContainer.textContent = 0;
		timeUp = false;
		score = 0;
		moleAppears();
		setTimeout(() => timeUp = true, 10000);
	}
	
	function hitMole(evt) {
		if (!evt.isTrusted) return; // if cheating and clicking fake
		++score;
		this.classList.remove("appear");
		scoreContainer.textContent = score;
	}
	
	startBtn.addEventListener("click", startGame);
	moles.forEach(elem => elem.addEventListener("click", hitMole));
}