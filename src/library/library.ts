type DrawData =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      color?: string;
    }
  | {
      type: "text";
      x: number;
      y: number;
      text: string;
      color?: string;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
      color?: string;
    }
  | null;

type DrawOptions = {
  canvasId: string;
  width: number;
  height: number;
};

const drawPart = (ctx: CanvasRenderingContext2D, data: DrawData) => {
  if (!data) return;
  switch (data.type) {
    case "rect":
      if (data.color) ctx.fillStyle = data.color;
      ctx.fillRect(data.x, data.y, data.width, data.height);
      break;
    case "text":
      if (data.color) ctx.fillStyle = data.color;
      ctx.fillText(data.text, data.x, data.y);
      break;
    case "circle":
      if (data.color) ctx.fillStyle = data.color;
      ctx.beginPath();
      ctx.arc(data.x, data.y, data.radius, 0, 2 * Math.PI);
      ctx.fill();
      break;
  }
};

const drawFrame = (
  ctx: CanvasRenderingContext2D,
  data: DrawData | DrawData[]
) => {
  console.log("drawing part");
  console.log(data);
  if (Array.isArray(data)) {
    data.forEach((part) => drawPart(ctx, part));
    return;
  }
  drawPart(ctx, data);
};

const setupCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: DrawOptions
) => {
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = "100%";
  canvas.style.height = canvas.clientWidth.toString() + "px";
  canvas.width = options.width * dpr;
  canvas.height = options.height * dpr;
  ctx.resetTransform();
  ctx.scale(dpr, dpr);
};

const animation = (
  draw: (time: number) => DrawData | DrawData[],
  options: DrawOptions
) => {
  const canvas = document.getElementById(options.canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No context");
  setupCanvas(canvas, ctx, options);
  window.addEventListener("resize", () => {
    console.log("triggerd resize for " + options.canvasId);
    setupCanvas(canvas, ctx, options);
  });

  // PLACEHOLDER
  ctx.font = "48px serif";

  function $run() {
    if (!ctx) throw new Error("No context");
    const time = performance.now();
    drawFrame(ctx, draw(time));
    requestAnimationFrame($run);
  }
  $run();
};

const image = (draw: DrawData | DrawData[], options: DrawOptions) => {
  const canvas = document.getElementById(options.canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No context");
  setupCanvas(canvas, ctx, options);
  window.addEventListener("resize", () => {
    console.log("triggerd resize for " + options.canvasId);
    setupCanvas(canvas, ctx, options);
    drawFrame(ctx, draw);
  });
  drawFrame(ctx, draw);
};

export type { DrawData };
export { animation, image };
