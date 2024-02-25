
export const GAME_START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const OPERA_GAME_FEN = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b - - 0 1'

export function posToId(pos: [number, number]){
    const [a,b] =  pos;
    const rank = a + 1;
    const file = indexToFile(b);
    return `${file}${rank}`
}

export function idToPos(id: string){
    const [file, rank] = id.split('');
    const b = fileToPos(file);
    const a = parseInt(rank) - 1;
    return [a,b];
}

export function indexToFile(index: number){
    const charCode = 'A'.charCodeAt(0) + index;
    return String.fromCharCode(charCode)
}

export function fileToPos(file: string){
    return file.charCodeAt(0) - 'A'.charCodeAt(0);
}
