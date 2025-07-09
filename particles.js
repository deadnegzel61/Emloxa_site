const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.speedY = (Math.random() - 0.5) * 0.7;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 5;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
const PARTICLE_COUNT = 120;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
