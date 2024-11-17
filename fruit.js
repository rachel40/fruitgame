const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variabel game
let fruits = [];
let score = 0;

// Gambar buah
const fruitImages = [
    "🍎", // Apel
    "🍌", // Pisang
    "🍉", // Semangka
    "🍇", // Anggur
];

// Fungsi membuat buah
function createFruit() {
    const fruit = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: 50,
        speed: Math.random() * 2 + 1,
        type: fruitImages[Math.floor(Math.random() * fruitImages.length)],
    };
    fruits.push(fruit);
}

// Fungsi memperbarui buah
function updateFruits() {
    for (let i = fruits.length - 1; i >= 0; i--) {
        const fruit = fruits[i];
        fruit.y -= fruit.speed;

        // Hapus buah yang keluar dari layar
        if (fruit.y + fruit.size < 0) {
            fruits.splice(i, 1);
        }
    }
}

// Fungsi menggambar buah
function drawFruits() {
    fruits.forEach((fruit) => {
        ctx.font = `${fruit.size}px Arial`;
        ctx.fillText(fruit.type, fruit.x, fruit.y);
    });
}

// Fungsi menangani klik (memotong buah)
canvas.addEventListener("click", (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    for (let i = fruits.length - 1; i >= 0; i--) {
        const fruit = fruits[i];
        const distance = Math.sqrt(
            (clickX - (fruit.x + fruit.size / 2)) ** 2 +
            (clickY - (fruit.y + fruit.size / 2)) ** 2
        );

        // Jika klik mengenai buah
        if (distance < fruit.size / 2) {
            fruits.splice(i, 1); // Hapus buah
            score += 1; // Tambah skor
            document.getElementById("score").innerText = score;
            break;
        }
    }
});

// Fungsi utama game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan layar

    // Perbarui dan gambar buah
    updateFruits();
    drawFruits();

    // Tambahkan buah secara acak
    if (Math.random() < 0.02) {
        createFruit();
    }

    requestAnimationFrame(gameLoop); // Loop game
}

// Mulai permainan
gameLoop();
