import { user } from "./user.js";

const field = document.querySelectorAll(".items-mines");
const depAmount = document.querySelector("#dep-amount");
const userInfo = document.querySelector(".userinfo");
const gameField = document.querySelector(".list-mines");
const startButton = document.querySelector("#start-game");

const mine = "💣";
let minePosition;
let openedCount = 0;
let current = 0;
let gameActive = false;

const updateBalance = () => {
  userInfo.textContent = `Balance: ${user.balance}`;
};

// Функція для скидання гри до початкового стану
const resetGame = () => {
  openedCount = 0;
  gameActive = false;
  gameField.style.display = "none";
  gameField.style.pointerEvents = "auto"; // Повертаємо клікабельність полю
  startButton.disabled = false;
  startButton.textContent = "START";

  // Очищуємо кожну клітинку
  field.forEach((grid) => {
    grid.innerHTML = "";
    grid.style.backgroundColor = "";
    grid.classList.remove("opened");
  });
};

updateBalance();
gameField.style.display = "none";

startButton.addEventListener("click", () => {
  current = Number(depAmount.value);

  if (current > user.balance || current <= 0) {
		setTimeout(() => {
    userInfo.style.color = "white";
			

		},500);
    userInfo.style.color = "red";

    return;
  }

  user.balance -= current;
  updateBalance();

  // Налаштування нової гри
  openedCount = 0;
  gameActive = true;
  minePosition = Math.floor(Math.random() * field.length);

  gameField.style.display = "grid";
  startButton.disabled = true;
});

field.forEach((grid, i) => {
  grid.addEventListener("click", () => {
    if (!gameActive || grid.classList.contains("opened")) return;

    grid.classList.add("opened");

    if (i === minePosition) {
      // ЛОГІКА ПРОГРАШУ
      grid.innerHTML = mine;
      grid.style.backgroundColor = "darkred";
      gameActive = false;

      // 1. Робимо поле неактивним
      gameField.style.pointerEvents = "none";
      console.log("Поле заблоковано на 3 секунди...");

      // 2. Через 3 секунди повертаємо все у початковий стан
      setTimeout(() => {
        resetGame();
        console.log("Гру скинуто. Можна грати знову!");
      }, 3000);
    } else {
      // ЛОГІКА УСПІШНОГО ХОДУ
      grid.style.backgroundColor = "lightgreen";
      openedCount++;

      if (openedCount === field.length - 1) {
        const winAmount = current * 2;
        user.balance += winAmount;
        updateBalance();
				
        // alert(`ПЕРЕМОГА! Ви отримали ${winAmount}`);
        resetGame(); // Скидаємо після перемоги
      }
    }
  });
});
