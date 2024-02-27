import styles from './PlayerCard.module.css'
import Image, { StaticImageData } from "next/image"
import { DemoUserImage, USER_IMAGES } from "@/app/lib/userUtils"
import { Bot, BotNames, SeedUserNames, User } from "@/app/lib/definitions"
import { BOT_IMAGES } from "@/app/lib/botUtils"

export default function PlayerCard ({
    player,
    type,
}:{
    player: Bot | User;
    type: 'human' | 'bot' | 'demo-user';
}) {

    if (type === "human"){
        return <UserCard player={player}/>
    } else if (type === "bot"){
        return <BotCard player={player}/>
    } else if (type === "demo-user"){
        return <DemoCard player={player}/>
    }
}

function UserCard ({player}:{ player: User | Bot; }) {
    return (
        <Card player={player} imageSrc={USER_IMAGES[player.name as SeedUserNames]}/>
    )
}
function BotCard ({player}:{ player: Bot | User; }) {
    return (
        <Card player={player} imageSrc={BOT_IMAGES[player.name as BotNames]}/>
    )
}
function DemoCard({player}:{ player: User | Bot; }) {
    return (
        <Card player={player} imageSrc={DemoUserImage}/>
    )
}


function Card ({
    player, 
    imageSrc
}:{
    player: Bot | User;
    imageSrc: StaticImageData
}) {
    return (
        <div className={styles.userCard}>
            <div className={styles.cardContent}>

                <div className={styles.userContent}>
                    <Image
                        src={imageSrc}
                        alt={`${player.name}'s profile picture`}
                        className={styles.userImage}
                    />
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>
                            {player.name}
                        </p>
                    </div>
                </div>

                <div className={styles.stopWatch}>
                    {/* <ClockIcon/> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div className={styles.time}>10:00</div>
                </div>
            </div>
        </div> 
    )
}

function ClockIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}