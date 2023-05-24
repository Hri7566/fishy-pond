import React from "react";
import { Chat } from "./components/Chat";
import { Names } from "./components/names/Names";

export const Main = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-black min-h-screen w-full text-gray-300 [text-shadow:_1px_1px_#444]">
            <h1 className="text-3xl">fishy pond</h1>
            <p>This site is under construction.</p>
            <Names />
            <Chat />
        </main>
    );
};
