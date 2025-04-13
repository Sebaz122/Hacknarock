import {Box} from "@mui/material";
import DropZone from "../drop-zone/DropZone.jsx";
import "./DropZoneGrid.scss";

function DropZoneGrid({periods}) {
    return (
        <Box className="drop-zone-grid">
            {periods.map((period, id) => (
                <DropZone period={period} id={id}/>
            ))}
        </Box>
    );
}

export default DropZoneGrid;