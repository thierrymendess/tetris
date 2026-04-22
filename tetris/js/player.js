const Player = {
    move(dir, arena, player) {
        player.pos.x += dir;
        if (Arena.collide(arena, player)) player.pos.x -= dir;
    },
    rotate(dir, arena, player) {
        const pos = player.pos.x;
        let offset = 1;
        this._rot(player.matrix, dir);
        while (Arena.collide(arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length) {
                this._rot(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
    },
    _rot(m, d) {
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < y; ++x) [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
        }
        if (d > 0) m.forEach(r => r.reverse()); else m.reverse();
    },
    reset(arena, player) {
        const p = 'ILJOTSZ';
        player.matrix = player.next || createPiece(p[Math.random() * p.length | 0]);
        player.next = createPiece(p[Math.random() * p.length | 0]);
        player.pos.y = 0;
        player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
        return Arena.collide(arena, player); // Retorna true se deu Game Over
    }
};