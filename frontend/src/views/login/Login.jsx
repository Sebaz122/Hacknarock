import {Box, Button} from "@mui/material";
import Logo from "../../components/logo/Logo.jsx";
import "./Login.scss"
import {useEffect, useState} from "react";
import {useStore} from "../../store.js";
import {useNavigate} from "react-router"

const CLIENT_ID = "6064aa4011c545279dcf167bebfaf27f";
const SPOTIFY_VERIFY_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://127.0.0.1:5173/login";
const SCOPES = ["user-read-private"];
const SCOPES_URL_PARAM = SCOPES.join("%20");

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
}

function Login() {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async () => {
        const codeVerifier = generateRandomString(64);
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        localStorage.setItem("code_verifier", codeVerifier);

        const params = new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: SCOPES_URL_PARAM,
            code_challenge_method: "S256",
            code_challenge: codeChallenge,
            redirect_uri: REDIRECT_URL_AFTER_LOGIN,
        });

        window.location = `${SPOTIFY_VERIFY_ENDPOINT}?${params.toString()}`;
    };

    const getToken = async (code) => {
        const codeVerifier = localStorage.getItem("code_verifier");
        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URL_AFTER_LOGIN,
                code_verifier: codeVerifier,
            }),
        };

        const body = await fetch("https://accounts.spotify.com/api/token", payload);
        const response = await body.json();

        if (response.access_token) {
            localStorage.setItem("access_token", response.access_token);
            setToken(response.access_token);
            useStore.getState().setToken(response.access_token);
        } else {
            console.error("Error fetching the token:", response);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            console.log("Authorization code:", code);
            getToken(code);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchProfile(token)
                .then(profile => {
                    if (profile.display_name) {
                        setName(profile.display_name)
                        useStore.getState().setName(profile.display_name);
                    }
                })
                .catch(err => console.error("Failed to fetch profile:", err));
        }
    }, [token]);

    if(token && name){
        navigate("/", {replace : true})
    }

    return (
        <Box className="login">
            <Logo/>
            <Button className="loginButton" variant="contained" onClick={handleLogin}>Log in with Spotify</Button>
        </Box>
    )
}

export default Login