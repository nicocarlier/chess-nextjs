import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers, fetchGameById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import InactiveChessBoard from '@/app/ui/InactiveChessBoard';
import styles from '@/app/ui/gameHistory/GameHistoryReview.module.css'

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    console.log("game id ", id)

    const [game, customers] = await Promise.all([
        fetchGameById(id),
        fetchCustomers(),
    ]);
    if (!game) {
        notFound();
    }

    console.log("game fen ", game.fen)
    
    return (
        <main>
            <h1>{`Review game id: ${id}`}</h1>
            <h1>{`Review game fen: ${game.fen}`}</h1>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Game History', href: '/dashboard/game-history' },
                {
                    label: 'Review Game',
                    href: `/dashboard/game-history/${id}/review`,
                    active: true,
                },
                ]}
            />
            <div className={styles.reviewContainer}>
                <div className={styles.boardContainer}>
                    <InactiveChessBoard position={game.fen.split(' ')[0]}/>
                </div>
                <div className={styles.sidePanel}>

                </div>

            </div>
            {/* <Form invoice={invoice} customers={customers} /> */}
        </main>
    );
}