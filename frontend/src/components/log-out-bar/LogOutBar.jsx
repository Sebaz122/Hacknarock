import { Box, Button, Typography } from "@mui/material";
import "./LogOutBar.scss";
import { useStore } from "../../store.js";
import { useNavigate } from "react-router";

function LogOutBar({ name }) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        useStore.getState().setToken(null);
        navigate("/login");
        console.log("logout");
    };

    return (
        <Box className="log-out-bar">
            <Typography className="text"> You're logged in as {name}</Typography>
            <Button className="log-out-button" onClick={handleLogOut}>Logout</Button>
        </Box>
    );
}

export default LogOutBar;