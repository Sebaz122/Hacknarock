import {Box} from "@mui/material";
import Track from "../track/Track";
import "./TrackGrid.scss";

function TrackGrid({trackInfos}) {
    return (
        <Box className="track-grid">
            {trackInfos.map((info, index) => (
                <Track key={index} url={info.url} trackName={info.name} period={info.category} id={index}/>
            ))}
        </Box>
    );
}

export default TrackGrid;