const screen = document.querySelector(".screen");
const mode = document.querySelector(".mode");
const clear = document.querySelector(".clear");

const initialDisplay = `<div class="input">
        <span class="text-area"></span><span class="blinker">|</span>
        </div>
<div class="output"></div>`;
const modes = `
<p>1 : STATISTICS</p>
<p>2 : GRAPHS</p>
<p>3 : FUNCTIONS</p>
<p>4 : EQUATION SOLVER</p>
`;

screen.innerHTML = initialDisplay;

mode.addEventListener("click", () => {
  screen.innerHTML = modes;
});

clear.addEventListener("click", () => {
  screen.innerHTML = initialDisplay;
});
