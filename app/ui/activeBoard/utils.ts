// export function getMousePos(e: MouseEvent){
//     let x, y;
//     if ((e.type === 'touchstart' || e.type === 'touchmove' ) && e.touches) {
//         x = e.touches[0].clientX;
//         y = e.touches[0].clientY;  
//     } else if (e.type === 'touchend' && e.changedTouches) {
//         x = e.changedTouches[0].clientX;
//         y = e.changedTouches[0].clientY;  
//     } else {
//         x = e.clientX;
//         y = e.clientY;
//     }
//     return [x, y];
// }


// export function mouseDownPos(e: MouseEvent){
//     return [e.clientX, e.clientY];
// }

const RANKS = 'ABCDEFGH';
const FILES = '12345678';

export function mouseMovePos(e: MouseEvent){
    return [e.clientX, e.clientY];
}

export function getSquareBeneathPosition(pos: {x: number, y: number}): string | null {
    const {x, y} = pos
    document.elementsFromPoint(x, y).forEach((ele=>{
        if (ele.id.length === 2){
            const [rank, file] = ele.id.split('');
            if ( RANKS.includes(rank) && FILES.includes(file) ){
                return ele.id;
            }
        }
    }))
    return null;
}