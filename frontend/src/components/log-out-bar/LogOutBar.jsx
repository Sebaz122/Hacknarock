import {Box, Button, Typography} from "@mui/material";
import "./LogOutBar.scss"
import {useStore} from "../../store.js";

function LogOutBar({name}) {
    const handleLogOut = async () => {
        useStore.getState().setToken(null);
    }

    return (
        <Box className="log-out-bar">
            <Typography className="text"> You're logged in as {name}</Typography>
            <Button className="log-out-button" onClick={handleLogOut}>Logout</Button>
        </Box>
    )
}

export default LogOutBar