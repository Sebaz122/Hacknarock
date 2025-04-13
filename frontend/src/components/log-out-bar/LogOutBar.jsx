import {Box, Button, Typography} from "@mui/material";
import "./LogOutBar.scss"

function LogOutBar({name}) {
    return (
        <Box className="log-out-bar">
            <Typography className="text"> You're logged in as {name}</Typography>
            <Button className="log-out-button">Logout</Button>
        </Box>
    )
}

export default LogOutBar