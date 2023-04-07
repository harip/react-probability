import { IconProps } from "@mui/material";

export interface HomePageModel {
    components: Array<Component>; 
}

export interface Component {
    iconName: any;
    title: string;
    componentPath: string;
}