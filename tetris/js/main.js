const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const nCanvas = document.getElementById('next');
const nCtx = nCanvas.getContext('2d');

ctx.scale(20, 20);
nCtx.scale(20, 20);

const arena = Arena.create(12, 20);
const player = { pos: {x:0, y:0}, matrix: null, next: null, score: 0, hiscore: Number(localStorage.getItem('tetris-hi')) || 0 };

function updateUI() {
    document.getElementById('score').innerText = String(player.score).padStart(5, '0');
    document.getElementById('hiscore').innerText = String(player.hiscore).padStart(5, '0');
}

function drawMatrix(m, o, c = ctx) {
    m.forEach((row, y) => {
        row.forEach((v, x) => {
            if (v !== 0) {
                c.fillStyle = COLORS[v];
                c.fillRect(x + o.x, y + o.y, 1, 1);
            }
        });
    });
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x:0, y:0});
    drawMatrix(player.matrix, player.pos);
}

function drawNext() {
    nCtx.fillStyle = '#000';
    nCtx.fillRect(0, 0, nCanvas.width, nCanvas.height);
    drawMatrix(player.next, {x:1, y:1}, nCtx);
}

function playerDrop() {
    player.pos.y++;
    if (Arena.collide(arena, player)) {
        player.pos.y--;
        Arena.merge(arena, player);
        player.score += Arena.sweep(arena);
        if (player.score > player.hiscore) {
            player.hiscore = player.score;
            localStorage.setItem('tetris-hi', player.hiscore);
        }
        if (Player.reset(arena, player)) {
            arena.forEach(row => row.fill(0));
            player.score = 0;
        }
        updateUI();
        drawNext();
    }
    dropCounter = 0;
}

let dropCounter = 0, lastTime = 0;
function update(time = 0) {
    const dt = time - lastTime; lastTime = time;
    dropCounter += dt;
    if (dropCounter > 1000) playerDrop();
    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', e => {
    if (e.keyCode === 37) Player.move(-1, arena, player);
    if (e.keyCode === 39) Player.move(1, arena, player);
    if (e.keyCode === 40) playerDrop();
    if (e.keyCode === 81) Player.rotate(-1, arena, player);
    if (e.keyCode === 87) Player.rotate(1, arena, player);
});

document.getElementById('start-btn').addEventListener('click', (e) => {
    audio.init(); audio.playTheme();
    Player.reset(arena, player);
    updateUI(); drawNext(); update();
    e.target.style.display = 'none';
});