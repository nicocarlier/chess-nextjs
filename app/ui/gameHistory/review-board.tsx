import { ArrowPathIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchFriends } from '@/app/lib/data';
import { USER_IMAGES } from '@/app/lib/userUtils';
import { SeedUserNames } from '@/app/lib/definitions'
import styles from './InviteFriends.module.css';;

export default async function ReviewBoard() {
  const friends = await fetchFriends();

  return (
    <div className={`${styles.container} md:col-span-4`}>
      <h2 className={`${styles.heading} ${styles.headingMd}`}>
        Invite Friends to a Game
      </h2>
      <div className={styles.friendsListContainer}>
        <div className="bg-white px-6">
          {friends.map((friend, i) => (
            <div
              key={friend.id}
              className={`${styles.friendItem} ${i !== 0 ? 'border-t' : ''}`}
            >
              <div className={styles.friendInfo}>
                <Image
                  src={USER_IMAGES[friend.name as SeedUserNames] || '/users/default-profile-image.png'}
                  alt={`${friend.name}'s profile picture`}
                  className={styles.friendName}
                  width={32}
                  height={32}
                />
                <div className={styles.friendNameText}>
                  <p className="truncate md:text-base">
                    {friend.name}
                  </p>
                </div>
              </div>
              <button className={styles.inviteButton}>
                send invite
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}