import HeaderComponent from "@/components/header";
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import styles from './deck.module.css';

const DeckComponent = () => {
    function getHeaderData(): HeaderComponentProps {
        return {
            previousComponent: 'coin',
            title: 'Deck Probability'
        }
    }

    return (
        <>
            <div className={styles.title}>
                <HeaderComponent {...getHeaderData()}></HeaderComponent>
            </div>
        </>
    )
}

export default DeckComponent;