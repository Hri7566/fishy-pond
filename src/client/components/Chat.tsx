import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useState
} from "react";
import { reactAPI } from "../api/trpc";
import { EventCallback, ServerEvents } from "../../server/ServerEventBus";

export const Chat = () => {
    const [chatList, setChatList] = useState([] as ServerEvents["chat"][]);
    let liKey = -1;

    const [placeholder, setPlaceholder] = useState(
        "You can chat with this thing."
    );

    const aMutation = reactAPI.channel.chat.useMutation();
    const [inputValue, setInputValue] = useState("");

    const sendChatMessage = (str: string) => {
        aMutation.mutate({
            message: str
        });
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = evt => {
        if (
            (evt.key == "Return" ||
                evt.key == "Enter" ||
                evt.key == "Escape") &&
            inputValue !== ""
        ) {
            sendChatMessage(inputValue);
            setInputValue("");
        }
    };

    const onChange: ChangeEventHandler<HTMLInputElement> = evt => {
        setInputValue(evt.target.value);
    };

    const onData = <EventID extends keyof ServerEvents>(
        data: ServerEvents[EventID]
    ) => {
        switch (data.m) {
            case "chat":
                setChatList([...chatList, data]);
                break;
        }
    };

    reactAPI.channel.subscribe.useSubscription(undefined, {
        onData
    });

    return (
        <div
            id="chat"
            className="w-screen p-5 m-2 mb-1 bg-white/5 backdrop-blur rounded-lg absolute bottom-16 border-[1px] border-white/5 shadow"
        >
            <ul>
                {chatList.map(msg => {
                    liKey++;
                    return (
                        <li key={liKey}>
                            <span
                                className="name"
                                style={{ color: msg.p.color }}
                            >
                                {msg.p.name}:{" "}
                            </span>
                            <span
                                className="message"
                                style={{
                                    color: msg.p.color
                                }}
                            >
                                {msg.message}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <input
                type="text"
                id="chat-input"
                name="chat-input"
                className="transition-colors bg-white/5 w-full rounded-md mt-2 px-2 py-1 border-[1px] border-white/5 shadow focus:outline-none focus:border-yellow-400/70"
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={inputValue}
            />
        </div>
    );
};
