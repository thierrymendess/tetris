const COLORS = [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];
function createPiece(type) {
    if (type === 'I') return [[0,2,0,0],[0,2,0,0],[0,2,0,0],[0,2,0,0]];
    if (type === 'L') return [[0,0,5],[5,5,5],[0,0,0]];
    if (type === 'J') return [[7,0,0],[7,7,7],[0,0,0]];
    if (type === 'O') return [[6,6],[6,6]];
    if (type === 'Z') return [[4,4,0],[0,4,4],[0,0,0]];
    if (type === 'S') return [[0,3,3],[3,3,0],[0,0,0]];
    if (type === 'T') return [[0,1,0],[1,1,1],[0,0,0]];
}