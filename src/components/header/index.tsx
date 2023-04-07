import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
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

    function navigateToHome() {
        router.push('/');
    }

    return (
        <>
            <AppBar position="static" >
                <Toolbar>
                    {props?.previousComponent && (
                        <div className={styles.navButton}>
                            <div>
                                <Button color="inherit" onClick={navigateToPreviousPage}> 
                                    <ArrowBackIcon fontSize='large' /> 
                                </Button>
                            </div>
                            <div>
                                {props.previousComponent}
                            </div>
                        </div>
                    )}

                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} className={styles.appbartitle}>
                        <div className={styles.title}>
                            {props.title}
                        </div>
                    </Typography>
                    {
                        <div className={styles.navButton}>
                            <div>
                                <IconButton 
                                    aria-label="home" 
                                    size="large" 
                                    className ={styles.home}
                                    onClick={navigateToHome}
                                    >
                                    <HomeIcon fontSize="large" />
                                </IconButton>                                    
                            </div>
                            {props?.nextComponent && ( 
                                <>
                                    <div>
                                        <Button color="inherit" onClick={navigateToNextPage}> 
                                            <ArrowForwardIcon fontSize='large' /> 
                                        </Button>
                                    </div>
                                    <div>
                                        {props.nextComponent}
                                    </div>
                                </> 
                            )}
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default HeaderComponent;