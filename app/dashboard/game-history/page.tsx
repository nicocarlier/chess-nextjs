
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/gameHistory/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import styles from '@/app/ui/gameHistory/GameHistory.module.css';

import { fetchGamesPages } from '@/app/lib/data';


export default async function Page({
  searchParams,
} : {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
    
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchGamesPages(query);

  return (
    <div className="w-full">
      <div className={styles.header}>
        <h1 className={`${lusitana.className} ${styles.title}`}>Game History</h1>
      </div>
      <div className={styles.searchSection}>
        <Search placeholder="Search games..." />
      </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className={styles.pagination}>
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}