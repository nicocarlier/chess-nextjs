import { GAME_START_FEN } from './chessUtils';
import { Move, MoveHistory, Revenue, playerColors } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export const generateMiniPagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 5 or less,
  // display all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last page.
  if (currentPage <= 3) {
    return [1, 2, 3, 
      // '...', totalPages
    ];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [
      // 1, 
      // '...', 
      totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    // '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    // '...',
  ];
};


export const generateMoveHistoryTablePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.


  // console.log("currentPage", currentPage)
  if (totalPages <= 11) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 7) {
    return [1, 2, 3, 4, 5, 6, 7,-1, totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 6) {
    return [1, 2, -1, totalPages - 6, totalPages - 5, totalPages - 4, 
    totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    -1,
    currentPage - 3,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    currentPage + 3,
    -1,
    totalPages,
  ];
};

export const getHalfMovesFromFull = (fullMoves: number, color: string): number => {
  const halfMoves = (fullMoves * 2) - (color === "white" ? 1 : 0);
  return halfMoves;
}

export const getHalfMovesFromMoveHistory = (moves: Move[]): number => {
  if (!moves.length){
    return 0;
  } else {
    const completedMoves = moves.length - 1;
    const currentMove = moves[moves.length - 1];
    return completedMoves * 2 + (('black' in currentMove) ? 2 : 1);
  }
}

export const getSubMoveFromMoveHistory = (halfMove: number, moveHistory: Move[]): {fen: string, move: string} => {
  if (halfMove === 0){
    return {fen: GAME_START_FEN, move: ''}
  }
  const [fullMove, color] = getFullMoveAndColor(halfMove);
  const {white, black, fenWhite, fenBlack} = moveHistory[fullMove - 1];
  if (color === "black" && fenBlack && black){
    return {fen: fenBlack, move: black}
  } else {
    return {fen: fenWhite, move: white}
  }
}

export const getFullMoveAndColor = (numHalfMoves: number): [number, playerColors] => {
  if (!numHalfMoves){
    return [0, "white"];
  } else {
    const completedMoves = Math.ceil(numHalfMoves / 2);
    const color = numHalfMoves % 2 === 0 ? 'black' : 'white';
    return [completedMoves, color]
  }
}

export const handleClickThroughMoves = (event: { key: string; }, current: number, updater: Function) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (event.key === 'ArrowLeft') {
          const newHalfMove = current - 1;
          updater(newHalfMove);
      } else if (event.key === 'ArrowRight') {
          const newHalfMove = current + 1;
          updater(newHalfMove);
      }
  }
};

export const getRandomWaitTime = (lower: number, upper: number) => {
  const range = upper - lower;
  const waitTime = ( lower + Math.random() * range) * 1000; // between upper and lower
  return waitTime;
};

export const getStaticBoardArray = (position: string, userColor: playerColors) => {
  const BOARD = Array(8).fill(null).map(() => Array(8).fill(null));
  const startingRows = position.split(' ')[0].split('/')

  if (userColor === "white"){
    startingRows.forEach((fenRow, r) => {
        const expandedRow = fenRow.replace(/\d/g, num => '-'.repeat(parseInt(num)));
        expandedRow.split('').forEach((fenChar, c) => {
            const file = String.fromCharCode("A".charCodeAt(0) + c);
            const rank = 8 - r;
            const val = fenChar !== '-' ? fenChar : null;
            BOARD[r][c] = {rank, file, fenChar: val};
        });
    });
  } else {
    startingRows.reverse().forEach((fenRow, r) => {
        const expandedRow = fenRow.replace(/\d/g, num => '-'.repeat(parseInt(num)));
        expandedRow.split('').reverse().forEach((fenChar, c) => {
            const file = String.fromCharCode("A".charCodeAt(0) + c);
            const rank = 8 - r;
            const val = fenChar !== '-' ? fenChar : null;
            BOARD[r][c] = {rank, file, fenChar: val};
        });
    });
  }

  return BOARD;
};
