const Arena = {
    create(w, h) {
        return Array.from({length: h}, () => Array(w).fill(0));
    },
    collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) return true;
            }
        }
        return false;
    },
    merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((v, x) => {
                if (v !== 0) arena[y + player.pos.y][x + player.pos.x] = v;
            });
        });
    },
    sweep(arena) {
        let count = 0;
        for (let y = arena.length - 1; y > 0; --y) {
            if (arena[y].every(v => v !== 0)) {
                arena.splice(y, 1);
                arena.unshift(new Array(arena[0].length).fill(0));
                y++;
                count++;
                audio.playTone(800, 'triangle', 0.2);
            }
        }
        return count * 10; // Retorna os pontos
    }
};