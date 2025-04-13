import { Box, Button, Typography } from "@mui/material";
import LogOutBar from "../../../components/log-out-bar/LogOutBar.jsx";
import "../Main.scss";
import Logo from "../../../components/logo/Logo.jsx";
import TrackGrid from "../../../components/track-grid/TrackGrid.jsx";
import DropZoneGrid from "../../../components/drop-zone-grid/DropZoneGrid.jsx";
import { periods } from "../../../consts.js";
import { useStore } from "../../../store.js";
import { useState, useMemo, useEffect } from "react";

function MainMock() {
    const [streak, setStreak] = useState(6);

    const currentErrors = useStore((state) => state.currentErrors);
    const lastUpdate = useStore((state) => state.update);
    const name = useStore((state) => state.name);
    const buckets = useStore((state) => state.buckets);
    const areAllIdsPresent = useStore((state) => state.areAllIdsPresent);
    const displayErrors = useStore((state) => state.displayErrors);
    const incrementCurrentAttempt = useStore((state) => state.incrementCurrentAttempt);
    const currentAttempt = useStore((state) => state.currentAttempt);
    const empytAllBuckets = useStore((state) => state.emptyAllBuckets);

    useEffect(() => {
        empytAllBuckets();
    }, []);


    const idsPresent = useMemo(() => {
        const idsToCheck = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const flatBuckets = buckets.flat();
        const result = idsToCheck.every((id) => flatBuckets.includes(id));
        return result;
    }, [buckets]);


    const submitEnabled = useMemo(() => {
        if (!lastUpdate) return true;
        const today = new Date().toISOString().split("T")[0];
        const lastUpdateDate = new Date(lastUpdate).toISOString().split("T")[0];
        const enabled = lastUpdateDate !== today && idsPresent;
        return enabled;
    }, [lastUpdate, idsPresent]);

    const tracksInfos = [
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "2020s", id: "1" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "2010s", id: "2" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "2000s", id: "3" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "90s", id: "4" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "80s", id: "5" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "70s", id: "6" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "60s", id: "7" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "Before", id: "8" },
        { url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6", name: "Sweet Weather", category: "Celtic", id: "9" },
    ];

    const checkIfValid = () => {
        const isValid = buckets.every((bucket, index) =>
            bucket.every((id) => {
                const track = tracksInfos[id];
                return track && track.category === periods[index];
            })
        );
        return isValid;
    };

    const submit = () => {
        displayErrors();
        incrementCurrentAttempt();
        if (checkIfValid()) {
            setStreak(streak + 1)
        } else {
            console.log("EEE NOT SUBMITTEDDD")
        }
        if (currentAttempt === 5) {
            // Handle streak removal
        }
        // handle
    };

    return (
        <Box className="main">
            <Box component="header" className="header">
                <LogOutBar name={name} />
            </Box>
            <Box component="main" className="content">
                <Logo />
                <Typography className="welcome">Welcome, {name}!</Typography>
                {streak !== 0 && (
                    <Box className="streak">
                        Your current streak is: {streak} 🔥
                    </Box>
                )}
                <TrackGrid trackInfos={tracksInfos} />
                <DropZoneGrid periods={periods} />
                <Button
                    onClick={submit}
                    disabled={!submitEnabled}
                    className="submit"
                >
                    {submitEnabled
                        ? "Submit"
                        : idsPresent
                            ? "Already submitted"
                            : "Assign all tracks"}
                </Button>
            </Box>
        </Box>
    );
}

export default MainMock;
