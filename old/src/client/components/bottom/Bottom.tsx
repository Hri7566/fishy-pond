import React from "react";
import { ChannelSelector } from "./ChannelSelector";

export const Bottom = () => {
    return (
        <div className="absolute bottom-0 min-h-[64px] min-w-full bg-white/5 p-2 border-[1px] border-white/5 shadow backdrop-blur">
            <ChannelSelector />
        </div>
    );
};
