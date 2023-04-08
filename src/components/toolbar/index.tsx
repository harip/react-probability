import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import styles from './toolbar.module.css'
import { ButtonGroup, Button } from "@mui/material";
import router from "next/router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';

const ToolBarComponent: React.FC<HeaderComponentProps> = (props) => {
    function navigateToPreviousPage() {
        if (props?.previousComponent) {
            router.push(props.previousComponent);
        }
    }

    function navigateToNextPage() {
        if (props?.nextComponent) {
            router.push(props.nextComponent);
        }
    }

    function navigateToHome() {
        router.push('/');
    }

    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" className={styles.appbar}>
                {props?.previousComponent && (  
                    <Button color="inherit" onClick={navigateToPreviousPage}> 
                        <ArrowBackIosIcon  fontSize='small' /> 
                    </Button>
                )}
                <Button color="inherit" onClick={navigateToHome}> 
                    <HomeIcon fontSize='small' /> 
                </Button>
                {props?.nextComponent && (  
                    <Button color="inherit" onClick={navigateToNextPage}> 
                        <ArrowForwardIosIcon fontSize='small' /> 
                    </Button>
                )}
            </ButtonGroup>
        </>
    )
}

export default ToolBarComponent;