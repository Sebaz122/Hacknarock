import {Box, Button, Typography} from "@mui/material";
import LogOutBar from "../../../components/log-out-bar/LogOutBar.jsx";
import "../Main.scss";
import Logo from "../../../components/logo/Logo.jsx";
import TrackGrid from "../../../components/track-grid/TrackGrid.jsx";
import DropZoneGrid from "../../../components/drop-zone-grid/DropZoneGrid.jsx";
import {periods} from "../../../consts.js";
import {useStore} from "../../../store.js";
import {useState, useMemo, useEffect} from "react";
import Confetti from 'react-confetti';


function MainMock() {
    const [streak, setStreak] = useState(6);
    const [lastUpdate, setLastUpdate] = useState("2025-04-12T01:48:57.198Z")
    const [currentTry, setCurrentTry] = useState(0)

    const name = useStore((state) => state.name);
    const buckets = useStore((state) => state.buckets);
    const displayErrors = useStore((state) => state.displayErrors);
    const incrementCurrentAttempt = useStore((state) => state.incrementCurrentAttempt);
    const currentAttempt = useStore((state) => state.currentAttempt);
    const emptyAllBuckets = useStore((state) => state.emptyAllBuckets);

    useEffect(() => {
        emptyAllBuckets();
    }, []);

    const [showConfetti, setShowConfetti] = useState(false);


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
        {
            "name": "Maneater",
            "url": "https://open.spotify.com/track/7j74lucZ59vqN67Ipe2ZcY",
            "category": "80s"
        },
        {
            "name": "Californication",
            "url": "https://open.spotify.com/track/48UPSzbZjgc449aqz8bxox",
            "category": "90s"
        },
        {
            "name": "Hotel Room Service",
            "url": "https://open.spotify.com/track/0OPyDgTRuIdCJ9B4bYSths",
            "category": "2000s"
        },
        {
            "name": "California",
            "url": "https://open.spotify.com/track/4KW66ZVoSyUN0TJXdL9mLc",
            "category": "2010s"
        },
        {
            "name": "I Was Made For Lovin' You",
            "url": "https://open.spotify.com/track/07q0QVgO56EorrSGHC48y3",
            "category": "70s"
        },
        {
            "name": "I'm Still Standing",
            "url": "https://open.spotify.com/track/1jDJFeK9x3OZboIAHsY9k2",
            "category": "80s"
        },
        {
            "name": "Wind Of Change",
            "url": "https://open.spotify.com/track/3ovjw5HZZv43SxTwApooCM",
            "category": "90s"
        },
        {
            "name": "Svärdsjö Polska",
            "url": "https://open.spotify.com/track/5u06jISj4KCIRooiahm7wu",
            "category": "Celtic"
        },
        {
            "name": "In the End",
            "url": "https://open.spotify.com/track/60a0Rd6pjrkxjPbaKzXjfq",
            "category": "2000s"
        }
    ]

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
            setLastUpdate("2025-04-13T01:48:57.198Z")
            setShowConfetti(true);

            setTimeout(() => setShowConfetti(false), 10000);
        } else {
            setCurrentTry(currentTry + 1)
        }
        if (currentAttempt === 5) {
            setStreak(0)
        }
    };

    return (
        <Box className="main">
            {showConfetti && <Confetti/>}
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
                {showConfetti && (
                    <Confetti
                        width={window.innerWidth}
                        height={1500}
                        numberOfPieces={500}
                        gravity={0.2}
                        recycle={false}
                    />
                )}
                <DropZoneGrid periods={periods}/>
                <Typography>Current try: {currentTry} / 5</Typography>
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
