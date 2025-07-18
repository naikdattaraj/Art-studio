// 🖌️ Canvas interaction
const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', () => (isDrawing = true));
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseleave', () => (isDrawing = false));

canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing) return;
  const x = event.offsetX;
  const y = event.offsetY;
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${random()}, ${random()}, ${random()}, 0.2)`;
  ctx.fill();
});

canvas.addEventListener('click', (e) => {
  const centerX = e.offsetX;
  const centerY = e.offsetY;
  for (let i = 0; i < 50; i++) {
    const angle = 0.1 * i;
    const x = centerX + (1 + angle) * Math.cos(angle) * 10;
    const y = centerY + (1 + angle) * Math.sin(angle) * 10;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${i * 7}, 100%, 60%)`;
    ctx.fill();
  }
});

function random() {
  return Math.floor(Math.random() * 255);
}

function toggleDrawMode() {
  isDrawing = !isDrawing;
}

// 📷 Image Upload
const uploadInput = document.getElementById('upload');
const uploadGallery = document.getElementById('uploaded-gallery');

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const imgUrl = URL.createObjectURL(file);
    const imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.classList.add('uploaded-art');
    uploadGallery.appendChild(imgEl);
  }
});

// ⭐ Favorites with localStorage
function favoriteArt(id) {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favs.includes(id)) favs.push(id);
  localStorage.setItem('favorites', JSON.stringify(favs));
  alert('Added to favorites!');
}

function showFavorites() {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.length === 0) {
    alert("No favorites yet!");
  } else {
    alert("Favorite Pieces: " + favs.join(', '));
  }
}

// 💾 Save canvas as image
function saveImage() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "my-artwork.png";
  link.href = image;
  link.click();
}

// 🌗 Theme Toggle with localStorage
const toggleBtn = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-theme', savedTheme === 'light');
  toggleBtn.textContent = savedTheme === 'light' ? '🌙 Dark Mode' : '🔆 Light Mode';
});

toggleBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  toggleBtn.textContent = isLight ? '🌙 Dark Mode' : '🔆 Light Mode';
});
