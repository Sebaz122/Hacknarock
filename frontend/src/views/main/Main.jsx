import {Box, Button, Typography} from "@mui/material";
import LogOutBar from "../../components/log-out-bar/LogOutBar.jsx";
import Logo from "../../components/logo/Logo.jsx";
import Track from "../../components/track/Track.jsx"
import DropZone from "../../components/drop-zone/DropZone.jsx";
import TrackGrid from "../../components/track-grid/TrackGrid.jsx";
import DropZoneGrid from "../../components/drop-zone-grid/DropZoneGrid.jsx";
import {periods} from "../../consts.js";
import {useStore} from "../../store.js";
import {useEffect, useState} from "react";
import axios from "axios";
import "./Main.scss"


function Main() {
    const state = useStore.getState()

    useEffect(() => {
        axios.get(`${backendUrl}/random`).then(
            response => {
                const tracksInfo = response.data
            })
    }, []);


    const submitButtonEnabled = () => {
        const lastUpdate = state.lastUpdate;
        if (!lastUpdate) return true;

        const today = new Date().toISOString().split("T")[0];
        const lastUpdateDate = new Date(lastUpdate).toISOString().split("T")[0];

        return lastUpdateDate !== today;
    };

    const submitEnabled = submitButtonEnabled()

    const submit = () => {
        state.displayErrors()
        state.incrementCurrentAttempt()
        if (state.currentAttempt == 5) {
            // send request to remove streak
        }
        // send request to remove streak
    }

    return (
        <Box className="main">
            <Box component="header" className="header">
                <LogOutBar name={name}/>
            </Box>
            <Box component="main" className="content">
                <Logo/>
                <Typography className="welcome">Welcome, {name}!</Typography>
                {streak !== 0 && (
                    <Box className="streak">
                        Your current streak is: {streak} 🔥
                    </Box>
                )}
                <TrackGrid trackInfos={tracksInfos}/>
                <DropZoneGrid periods={periods}/>
                <Button onClick={submit} disabled={!submitEnabled}
                        className="submit">{submitEnabled ? "Submit" : "Already submitted today"}</Button>
            </Box>
        </Box>
    )
}

export default Main