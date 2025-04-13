import {Box} from "@mui/material";
import {BrowserRouter, Route, Routes, Navigate} from "react-router";
import Main from "./views/main/Main.jsx";
import MainMock from "./views/main/mock/MainMock.jsx";
import Login from "./views/login/Login.jsx";
import {useStore} from "./store.js";

function PrivateRoute({children}) {
    const token = useStore((state) => state.token);
    const tokenExpiration = useStore((state) => state.tokenExpiration);

    const isTokenExpired = tokenExpiration && new Date() > new Date(tokenExpiration);

    if (!token || isTokenExpired) {
        useStore.getState().deleteToken()
        return <Navigate to="/login"/>;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/mock" element={<MainMock/>}/>

                <Route path="/" element={
                    <PrivateRoute>
                        <Main/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;