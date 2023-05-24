import React, { PropsWithChildren, useState } from "react";

export const Participant = (
    props: PropsWithChildren & {
        isMe: boolean;
    }
) => {
    const [name, setName] = useState("Anonymous");
    const [color, setColor] = useState("#8d3f50");
    const [me, setMe] = useState(props.isMe);

    return (
        <div
            className={
                "block float-left relative p-1 m-1 min-w-[50px] rounded-md text-xs text-center cursor-pointer min-h-[15px] max-w-full align-center shadow border-white/10 border" +
                (props.isMe
                    ? " after:content-['Me'] after:absolute after:top-[-4px] after:right-[50%] after:text-[10px]"
                    : "")
            }
            style={{ backgroundColor: color }}
        >
            <div>{name}</div>
        </div>
    );
};
