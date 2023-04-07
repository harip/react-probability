import { Component, HomePageModel } from "./models/HomePageModel";

const components : Array<Component> = [
    {
        iconName: "dice",
        title: "Dice Probability",
        componentPath: "dice"
    },
    {
        iconName: "coins",
        title: "Coin Probability",
        componentPath: "coin"
    }
];

const homePageData : HomePageModel = {
    components : components
}

export default homePageData;