import { Box, Chip } from "@mui/material";

interface OutcomeDisplayProps {
    data: any;
    onOutcomeClick: any
}
const OutcomeDisplayComponent: React.FC<OutcomeDisplayProps> = ({ data, onOutcomeClick }) => {
    return (
        <Chip label={`${data}`} variant="outlined" color="primary" onClick={()=>onOutcomeClick(data)} />
    )
}

export default OutcomeDisplayComponent;