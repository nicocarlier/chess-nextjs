// game sounds

import { moveTypes } from "./definitions";

// export const acheivement = new Audio('/sounds/acheivement.mp3');
// export const capture = new Audio('/sounds/capture.mp3');
// export const castle = new Audio('/sounds/castle.mp3');
// export const click = new Audio('/sounds/click.mp3');
// export const correct = new Audio('/sounds/correct.mp3');
// export const decline = new Audio('/sounds/decline.mp3');
// export const drawoffer = new Audio('/sounds/draw-offer.mp3');
// export const eventEnd = new Audio('/sounds/event-end.mp3');
// export const eventStart = new Audio('/sounds/event-start.mp3');
// export const eventWarning = new Audio('/sounds/event-warning.mp3');
// export const gameDraw = new Audio('/sounds/game-draw.mp3');
// export const gameEnd = new Audio('/sounds/game-end.mp3');
// export const gameLoseLong = new Audio('/sounds/game-lose-long.mp3');
// export const gameLose = new Audio('/sounds/game-lose.mp3');
// export const gameStart = new Audio('/sounds/game-start.mp3');
// export const gameWinLong = new Audio('/sounds/game-win-long.mp3');
// export const gameWin = new Audio('/sounds/game-win.mp3');
// export const illegal = new Audio('/sounds/illegal.mp3');
// export const incorrect = new Audio('/sounds/incorrect.mp3');
// export const lessonFail = new Audio('/sounds/lesson-fail.mp3');
// export const lessonPass = new Audio('/sounds/lesson-pass.mp3');
// export const moveCheck = new Audio('/sounds/move-check.mp3');
// export const moveOpponent = new Audio('/sounds/move-opponent.mp3');
// export const moveSelf = new Audio('/sounds/move-self.mp3');
// export const notification = new Audio('/sounds/notification.mp3');
// export const notify = new Audio('/sounds/notify.mp3');
// export const premove = new Audio('/sounds/premove.mp3');
// export const promote = new Audio('/sounds/promote.mp3');
// export const puzzleCorrect2 = new Audio('/sounds/puzzle-correct-2.mp3');
// export const puzzleCorrect = new Audio('/sounds/puzzle-correct.mp3');
// export const puzzleWrong = new Audio('/sounds/puzzle-wrong.mp3');
// export const scatter = new Audio('/sounds/scatter.mp3');
// export const shoutout = new Audio('/sounds/shoutout.mp3');
// export const tenseconds = new Audio('/sounds/ten-seconds.mp3');

// export function getMoveSound(moveTypes: moveTypes){
//     if (moveTypes.isCastlingKingSide || moveTypes.isCastlingQueenSide){
//         return castle;
//     } else if (moveTypes.isPromotion){
//         return promote
//     } else if (moveTypes.isCapture){
//         return capture
//     }  else if (moveTypes.isCheck){
//         return moveCheck
//     }
// }

export const getMoveSound = (moveTypes: moveTypes): HTMLAudioElement | undefined => {
    // Check if window is defined, which indicates we're running in the browser
    if (typeof window === 'undefined') {
        return undefined;
    }

    if (moveTypes.isCastlingKingSide || moveTypes.isCastlingQueenSide) {
        return new Audio('/sounds/castle.mp3');
    } else if (moveTypes.isPromotion) {
        return new Audio('/sounds/promote.mp3'); // Assuming there's a promote.mp3, replace as necessary
    } else if (moveTypes.isCapture) {
        return new Audio('/sounds/capture.mp3');
    } else if (moveTypes.isCheck) {
        return new Audio('/sounds/check.mp3'); // Assuming there's a check.mp3, replace as necessary
    } else {
        return new Audio('/sounds/move-self.mp3');
    }
};


export const getMoveSoundFilePath = (moveTypes: moveTypes): string => {
    if (moveTypes.isCastlingKingSide || moveTypes.isCastlingQueenSide) {
        return '/sounds/castle.mp3';
    } else if (moveTypes.isPromotion) {
        return '/sounds/promote.mp3'; // Assuming there's a promote.mp3, replace as necessary
    } else if (moveTypes.isCapture) {
        return '/sounds/capture.mp3';
    } else if (moveTypes.isCheck) {
        return '/sounds/check.mp3'; // Assuming there's a check.mp3, replace as necessary
    } else {
        return '/sounds/move-self.mp3';
    }
};