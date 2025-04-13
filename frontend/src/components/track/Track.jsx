import { useDrag } from "react-dnd";
import { Spotify } from "react-spotify-embed";
import { useRef, useEffect, useState } from "react";
import PanToolIcon from "@mui/icons-material/PanTool";

function Track({ url, trackName, period, id }) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const [{ isDragging }, drag, preview] = useDrag({
        type: "track",
        item: { id, url, trackName, period, id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        if (ref.current) {
            preview(ref.current, { captureDraggingState: true });
        }
    }, [preview]);

    return (
        <div
            ref={(node) => {
                drag(node);
                ref.current = node;
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "width 0.3s ease, background-color 0.3s ease",
                opacity: isDragging ? 0.5 : 1,
                cursor: isHovered ? "grab" : isDragging ? "grabbing" : "default",
                border: "8px solid #6d7a7a",
                height: "80px",
                borderRadius: "20px",
                backgroundColor: isDragging ? "#323f3f" : "rgba(255,255,255,0.53)",
                padding: "0 10px 0 0",
            }}
        >
            <Spotify wide link={url} />
            <PanToolIcon
                style={{
                    fontSize: "28px",
                    marginLeft: "10px",
                    color: isHovered ? "#ccc" : "#888",
                    transition: "color 0.2s ease",
                }}
            />
        </div>
    );
}

export default Track;
