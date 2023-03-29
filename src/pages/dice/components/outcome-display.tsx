import { Box, Chip } from "@mui/material";

const OutcomeDisplayComponent = (props: any) => {
    return(
        <Chip label={`${props.data}`} variant="outlined" color="primary"/>
    )
}

export default OutcomeDisplayComponent;