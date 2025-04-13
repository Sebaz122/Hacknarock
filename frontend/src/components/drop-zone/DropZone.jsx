import {useDrop} from "react-dnd";
import {Box, Typography, Chip} from "@mui/material";
import {useState} from "react";
import "./DropZone.scss";
import {useStore} from "../../store.js";

function DropZone({period}) {
    const [items, setItems] = useState([]);
    const shouldDisplayError = useStore((state) => state.shouldDisplayError);
    const notDisplayErrors = useStore((state) => state.notDisplayErrors);

    const displayErrors = () => {
        console.log("shouldDisplayError: ", shouldDisplayError)
        const badPeriod = items.some((item) => item.period !== period);
        return shouldDisplayError && badPeriod;
    };

    const [{isOver}, dropRef] = useDrop({
        accept: "track",
        drop: (item) => {
            console.log("✅ Drop received:", item);
            notDisplayErrors();
            setItems((prevItems) => {
                if (!prevItems.some((existingItem) => existingItem.id === item.id)) {
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
        setItems((prevItems) => prevItems.filter((_, i) => i !== index)); // Remove item by index
    };

    return (
        <Box className={`drop-zone ${displayErrors() ? "errors" : ""}`}>
            <Typography className="drop-text">{period}</Typography>

            <Box
                ref={dropRef}
                className={`drop-area ${isOver ? "is-over" : ""} ${displayErrors() ? "errors" : ""}`}
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