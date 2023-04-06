export interface InfiniteScrollProps {
    onItemSelect? : Function;
    displayItemSize?:number;
    items : Array<InfiniteScrollItem>;
}

export interface InfiniteScrollItem {
    key?: string;
    value?: any;
}