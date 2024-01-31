const blinker = document.querySelector(".blinker");

const blink = () => {
  blinker.style.color = "white";
  setTimeout(() => {
    blinker.style.color = "transparent";
  }, 500);
};
setInterval(blink, 1000);
