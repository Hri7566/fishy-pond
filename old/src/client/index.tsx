import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { App } from "./app";

const domRoot = document.getElementById("root");

if (domRoot) {
    const root = createRoot(domRoot);
    root.render(<App />);
} else {
    console.error("Unable to find root element");
}
