
import DiceIconComponent from './dice-icon';

interface DiceComponentProps {
    value: number
}

const DiceComponent:React.FC<DiceComponentProps> = ({value}) => {
    return(
        <>
            <DiceIconComponent value={value}/>
        </>
    )
}

export default DiceComponent;