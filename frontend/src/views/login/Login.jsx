import {Box, Typography} from "@mui/material";
import Logo from "../../components/logo/Logo.jsx";
import "./Login.scss"


function Login() {
    return (
        <Box className="login">
            <Logo/>
            <Typography>Log in with spotify</Typography>
        </Box>
    )
}

export default Login