'use client'

export default function MoveHistoryTable({
    moveHistory
  }: {
    moveHistory: MoveHistory;
  }) {

    const searchParams = useSearchParams();
    const currentMove = searchParams.get('move');

}