import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './header.module.css'
import router from "next/router";

const HeaderComponent: React.FC<HeaderComponentProps> = (props) => {

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

    return (
        <>
            <AppBar position="static" >
                <Toolbar>
                    <Button color="inherit" onClick={navigateToPreviousPage}>
                        <ArrowBackIcon fontSize='large' />
                    </Button>
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} className={styles.appbartitle}>
                        <div className={styles.title}>
                            {props.title}
                        </div>
                    </Typography>
                    <Button color="inherit" onClick={navigateToNextPage}>
                        <ArrowForwardIcon fontSize='large' />
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default HeaderComponent;