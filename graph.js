const plane = document.querySelector(".graphs");

const yCod = document.createElement("div");
yCod.classList.add("y-axis");
plane.append(yCod);

const x = 30;
function plot(x) {
  for (let i = 0; i < x; i++) {
    const xCod = document.createElement("div");
    xCod.classList.add("x-axis");
    const yHolder = document.createElement("div");
    yHolder.classList.add("y-holder");
    yCod.append(yHolder);
    plane.append(xCod);
  }
}

plot(x);

const midX = document.querySelectorAll(".x-axis");

midX[x / 2 - 1].style.background = "white";
midX[x / 2 - 1].style.height = "1px";
midX[x / 2 - 1].style.opacity = "1";
midX[x / 2 - 1].style.display = "flex";
midX[x / 2 - 1].style.marginLeft = "-14px";

const midY = document.querySelectorAll(".y-holder");
midY[x / 2].style.background = "white";
midY[x / 2].style.width = "1px";
midY[x / 2].style.opacity = "1";
midY[x / 2].style.transform = "rotate(180deg)";

function plotValues(a) {
  for (let i = -15; i < x - 15; i++) {
    const xValues = document.createElement("div");
    xValues.innerHTML = i;
    xValues.classList.add("x-values");
    midX[x / 2 - 1].append(xValues);

    const yValues = document.createElement("div");
    yValues.innerHTML = i;
    yValues.classList.add("y-values");
    midY[x / 2].append(yValues);
  }
}
plotValues(x);

function addGraph(m, ty) {
  const rot = 180 - m * (180 / Math.PI);

  const tran = ty * 20;
  const graph = document.createElement("div");
  graph.classList.add("str-line");
  graph.style.width = "0%";
  graph.style.height = "2px";
  graph.style.marginLeft = "20px";
  graph.style.marginTop = "-20px";
  graph.style.background = "red";
  graph.style.position = "absolute";
  graph.style.transition = "2s";
  graph.style.transform = `rotate(${rot}deg) translateY(${tran}px)`;
  plane.append(graph);
  setTimeout(transform, 1000);
}

addGraph(-2, -1);
// const y = m * xInt + c;
function transform() {
  const graph = document.querySelector(".str-line");
  graph.style.width = "110%";
}
const toolTip = document.createElement("div");
toolTip.classList.add("tool-tip");
toolTip.innerHTML = "<h3>y = mx + c</h3>";

plane.append(toolTip);
