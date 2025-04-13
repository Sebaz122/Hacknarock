import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {StyledEngineProvider} from "@mui/material";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "./main.scss";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </StyledEngineProvider>
    </StrictMode>
);
