import { InfiniteScrollItem, InfiniteScrollProps } from "@/lib/models/InfiniteScrollModel";
import { Button, Chip } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import { useState,useEffect } from "react";

const InfiniteScrollComponent: React.FC<InfiniteScrollProps> = ({
    items, 
    onItemSelect, 
    displayItemSize=1000
}) => {
    const [itemSize, setItemSize] = useState<number>(displayItemSize);
    const visibleItems = items.slice(0,itemSize);
    useEffect(()=>{
        setItemSize(displayItemSize);     
    },[items])
 
    const getRenderItems = () => {
        const combos = visibleItems.map((m,i)=>{
            return (
                <Chip 
                    label={`${m.value}`} 
                    variant="outlined" 
                    color="primary" 
                    key={`infinite-${i}`}
                    onClick={()=>onItemClick(m)}
                />
            )
        });
        return combos;
    }

    const onItemClick = (data: InfiniteScrollItem) => {
        if (onItemSelect) {
            onItemSelect(data.value)
        }
    }

    const showMoreButton = () => {
        return items.length > visibleItems.length;
    }

    const onMoreClick = () => {
        setItemSize(itemSize + displayItemSize);
    }

    return(
        <>
            {getRenderItems()}
            {
                showMoreButton() && (
                    <div>
                        <br/>
                        <Button variant="contained" startIcon={<SyncIcon />} onClick={onMoreClick}>
                            {items.length - itemSize} More
                        </Button>
                    </div>
                )
            } 
        </>
    )
}

export default InfiniteScrollComponent;