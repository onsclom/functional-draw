const example = `import { animation } from "functional-draw";

const range = (n) => [...Array(n).keys()];

const background = {
  type: "rect",
  x: 0,
  y: 0,
  width: 500,
  height: 500,
  color: "white",
};

const circles = (time) =>
  range(100).map((i) => ({
    type: "circle",
    x: (i % 10) * 50 + 25,
    y: Math.floor(i / 10) * 50 + 25,
    radius: 20 + Math.sin(i / 2 + time) * 10,
    color: "black",
  }));

animation((time) => 
  [background, ...circles(time)], 
  {
    canvasId: "animation-example",
    width: 500,
    height: 500,
  });`;

export default example;
