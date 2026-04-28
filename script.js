/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

/* AI SNAKE CANVAS */
const canvas = document.getElementById("aiCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let angle = 0;
const trail = [];
const length = 120;

function getCenter() {
  const img = document.querySelector(".glow-ring img");
  const r = img.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const center = getCenter();
  const radius = 160;

  const headX = center.x + Math.cos(angle) * radius;
  const headY = center.y + Math.sin(angle) * radius;

  trail.unshift({ x: headX, y: headY });
  if (trail.length > length) trail.pop();

  trail.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = `hsla(${180 + i},100%,60%,${1 - i / length})`;
    ctx.arc(p.x, p.y, 8 - i * 0.05, 0, Math.PI * 2);
    ctx.fill();
  });

  angle += 0.02;
  requestAnimationFrame(animate);
}

animate();

/* TALKING IMAGE ON FORM SUBMIT */
const form = document.getElementById("contactForm");
const popup = document.getElementById("aiPopup");

form.addEventListener("submit", e => {
  e.preventDefault();
  popup.classList.add("active");

  setTimeout(() => {
    popup.classList.remove("active");
    form.reset();
  }, 4500);
});
