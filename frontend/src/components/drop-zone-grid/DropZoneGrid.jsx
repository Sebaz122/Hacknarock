import {Box} from "@mui/material";
import DropZone from "../drop-zone/DropZone.jsx";
import "./DropZoneGrid.scss";

function DropZoneGrid({periods}) {
    return (
        <Box className="drop-zone-grid">
            {periods.map((period) => (
                <DropZone period={period}/>
            ))}
        </Box>
    );
}

export default DropZoneGrid;