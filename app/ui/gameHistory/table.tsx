import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredGames } from '@/app/lib/data';
import InactiveChessBoard from '../InactiveChessBoard';


export default async function GamesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const games = await fetchFilteredGames(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Opponent</th>
                <th scope="col" className="px-3 py-5 font-medium">Date</th>
                <th scope="col" className="px-3 py-5 font-medium">Result</th>
                <th scope="col" className="px-3 py-5 font-medium">Duration</th>
                <th scope="col" className="px-3 py-5 font-medium">End Position</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {games?.map((game) => (
                <tr
                  key={game.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {game.opponent_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(game.created_at.toISOString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.result}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {`${Math.round(game.duration)} minutes`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {<InactiveChessBoard position={game.fen.split(' ')[0]}/>}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* Placeholder for any action buttons like viewing more details */}
                      <p>review =</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}