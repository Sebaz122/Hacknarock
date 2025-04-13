import { Box, Button, Typography } from "@mui/material";
import LogOutBar from "../../components/log-out-bar/LogOutBar.jsx";
import "./Main.scss";
import Logo from "../../components/logo/Logo.jsx";
import TrackGrid from "../../components/track-grid/TrackGrid.jsx";
import DropZoneGrid from "../../components/drop-zone-grid/DropZoneGrid.jsx";
import { periods, backendUrl } from "../../consts.js";
import { useStore } from "../../store.js";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

function Main() {
    const [tracksInfos, setTrackInfos] = useState(null)

    const streak = useStore((state) => state.streak);
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

    useEffect(() => {
        axios.get(`${backendUrl}/random`).then(
            response => {
                setTrackInfos(response.data)
            })
    }, []);

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
            axios.get(`${backendUrl}/streak/increment`)
        } else if (currentAttempt === 5) {
            axios.get(`${backendUrl}/streak/reset`)
        }
    };

    return (
        <>
            { tracksInfos &&
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
            }
        </>
    );
}

export default Main;
