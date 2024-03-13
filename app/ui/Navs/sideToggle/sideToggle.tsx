import { useDispatch } from "react-redux";
import { toggleSideNav } from "@/redux/uiSlice";
import styles from './sideToggle.module.css';


export default function SideToggle({minimized}:{minimized: boolean}){
    const dispatch = useDispatch();
    const toggleButtonClass = minimized ? styles.minToMaxButton : styles.maxToMinButton;
    const messageClass = minimized ? styles.openMessage : styles.closeMessage;
    const messageContainerClass = minimized ? styles.openMessageContainer : styles.closeMessageContainer;
    const messageText = minimized ? "Open sidebar" : "Close sidebar";
 
    return (
        <div className={styles.toggleSideNavContainer}>
            <div className={styles.pseudoHoverContainer}>
                <div 
                    className={styles.buttonContainer}
                    onClick={() => dispatch(toggleSideNav())}
                >
                    <div className={toggleButtonClass}>
                        <div className={styles.one}></div>
                        <div className={styles.two}></div>
                    </div>
                </div>
                <div className={messageContainerClass}>
                    <div className={styles.messagePointer}></div>
                    <div className={messageClass}>{messageText}</div>
                </div>
            </div>
        </div>
    )
}