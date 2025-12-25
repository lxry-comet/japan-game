const spin = ["🍒", "🍋", "🍊"];


const slots1 = document.getElementById('slots_1');
const slots2 = document.getElementById('slots_2');
const slots3 = document.getElementById('slots_3');
const spinButton = document.querySelector('.span-btn');

const balance = document.getElementById('balance');

let attempts = 0;

let userBalance = Number(balance.textContent);
console.log(`Початок: ${balance.textContent}`);
function checkWinner(r1, r2, r3) {
    if (r1 === spin[0] && r2 === spin[0] && r3 === spin[0]) {
        userBalance += 100;
				
    } else if (r1 === spin[1] && r2 === spin[1] && r3 === spin[1]) {
        userBalance += 50;
    } else if (r1 === spin[2] && r2 === spin[2] && r3 === spin[2]) {
        userBalance += 25;
    } else {
        attempts++;
        // console.log(`Try again! Спроба №: ${attempts}`);
        console.log(`Спроба №${attempts}: ${r1} ${r2} ${r3}`);
    }
		balance.textContent = userBalance;
}

spinButton.addEventListener("click", () => {

		userBalance -= 50;
    balance.textContent = userBalance;

    spinButton.disabled = true; 
    const interval = setInterval(() => {
        slots1.textContent = spin[Math.floor(Math.random() * spin.length)];
        slots2.textContent = spin[Math.floor(Math.random() * spin.length)];
        slots3.textContent = spin[Math.floor(Math.random() * spin.length)];
    }, 50);

    setTimeout(() => {
        clearInterval(interval); 

        const r1 = spin[Math.floor(Math.random() * spin.length)];
        const r2 = spin[Math.floor(Math.random() * spin.length)];
        const r3 = spin[Math.floor(Math.random() * spin.length)];

        checkWinner(r1, r2, r3);
        
				slots1.textContent = r1;
        slots2.textContent = r2;
        slots3.textContent = r3;

        spinButton.disabled = false; 
    }, 2000); 
});