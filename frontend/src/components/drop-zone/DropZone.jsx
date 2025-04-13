import {useDrop} from "react-dnd";
import {Box, Typography, Chip} from "@mui/material";
import {useState} from "react";
import "./DropZone.scss";
import {useStore} from "../../store.js";

function DropZone({period, id}) {
    const [items, setItems] = useState([]);
    const shouldDisplayError = useStore((state) => state.shouldDisplayError);
    const notDisplayErrors = useStore((state) => state.notDisplayErrors);
    const addToBucket = useStore((state) => state.addToBucket);
    const removeFromBucket = useStore((state) => state.removeFromBucket);


    const allItemsAreWrong = items.every((item) => item.period !== period);
    const someItemsAreWrong = items.some((item) => item.period !== period);

    const displayErrors = () => {
        return shouldDisplayError && allItemsAreWrong;
    };

    const displayWarning = () => {
        return shouldDisplayError && someItemsAreWrong && !allItemsAreWrong;
    };


    const [{isOver}, dropRef] = useDrop({
        accept: "track",
        drop: (item) => {
            setItems((prevItems) => {
                if (!prevItems.some((existingItem) => existingItem.id === item.id)) {
                    notDisplayErrors();
                    addToBucket(id, item.id)
                    return [...prevItems, item];
                }
                return prevItems;
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleDelete = (index) => {
        setItems((prevItems) => {
            const itemToRemove = prevItems[index];
            removeFromBucket(id, itemToRemove.id);
            return prevItems.filter((_, i) => i !== index);
        });
    };

    return (
        <Box className={`drop-zone ${displayWarning() ? "warnings" : ""} ${displayErrors() ? "errors" : ""}`}>
            <Typography className="drop-text">{period}</Typography>

            <Box
                ref={dropRef}
                className={`drop-area ${isOver ? "is-over" : ""} ${displayWarning() ? "warnings" : ""} ${displayErrors() ? "errors" : ""}`}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                    }}
                >
                    {items.map((item, index) => (
                        <Chip
                            className="chip"
                            key={item.id}
                            label={item.trackName}
                            onDelete={() => handleDelete(index)}
                            color="primary"
                            variant="outlined"
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default DropZone;