const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let modijiY = canvas.height / 2;
let velocity = 0;
let gravity = 0.5;
let lift = -10;
let score = 0;

const pipes = [];

function createPipe() {
  const gap = 200;
  const top = Math.random() * (canvas.height - gap - 100);
  pipes.push({ x: canvas.width, top, bottom: top + gap });
}

function update() {
  velocity += gravity;
  modijiY += velocity;

  if (modijiY + 30 > canvas.height) modijiY = canvas.height - 30;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(100, modijiY, 30, 0, Math.PI * 2);
  ctx.fill();

  pipes.forEach((pipe, i) => {
    pipe.x -= 5;
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, 80, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 80, canvas.height - pipe.bottom);

    if (pipe.x + 80 < 0) {
      pipes.splice(i, 1);
      score++;
    }

    if (
      100 + 30 > pipe.x &&
      100 - 30 < pipe.x + 80 &&
      (modijiY - 30 < pipe.top || modijiY + 30 > pipe.bottom)
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  });

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 20, 50);
}

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("click", () => (velocity = lift));
window.addEventListener("keydown", e => {
  if (e.code === "Space") velocity = lift;
});

setInterval(createPipe, 1500);
gameLoop();