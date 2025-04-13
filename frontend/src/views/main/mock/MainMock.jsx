import {Box, Button, Typography} from "@mui/material";
import LogOutBar from "../../../components/log-out-bar/LogOutBar.jsx";
import "../Main.scss"
import Logo from "../../../components/logo/Logo.jsx";
import Track from "../../../components/track/Track.jsx"
import DropZone from "../../../components/drop-zone/DropZone.jsx";
import TrackGrid from "../../../components/track-grid/TrackGrid.jsx";
import DropZoneGrid from "../../../components/drop-zone-grid/DropZoneGrid.jsx";
import {periods} from "../../../consts.js";
import {useStore} from "../../../store.js";
import {useState} from "react";


function MainMock() {
    const [streak, setStreak] = useState(6)
    const state = useStore.getState()
    const name = "Artur"


    const tracksInfos = [
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "2020s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "2010s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "2000s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "90s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "80s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "70s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "60s"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "Before"
        },
        {
            url: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6",
            name: "Sweet Weather",
            category: "Celtic"
        }
    ];

    const submitButtonEnabled = () => {
        const lastUpdate = state.lastUpdate;
        if (!lastUpdate) return true;

        const today = new Date().toISOString().split("T")[0];
        const lastUpdateDate = new Date(lastUpdate).toISOString().split("T")[0];

        return lastUpdateDate !== today;
    };

    const submitEnabled = submitButtonEnabled()

    const submit = () => {
        console.log("submitting")
        console.log(state.shouldDisplayError)
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

export default MainMock