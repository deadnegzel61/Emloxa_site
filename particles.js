const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.r = Math.random() * 2 + 1;
    this.dx = (Math.random() - 0.5) * 1;
    this.dy = (Math.random() - 0.5) * 1;
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x <= 0 || this.x >= width) this.dx *= -1;
    if (this.y <= 0 || this.y >= height) this.dy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 100; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
