import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useState
} from "react";
import { reactAPI } from "../api/trpc";

interface ChatMessage {
    m: "a";
    a: string;
    p: {
        name: string;
        color: string;
    };
    t: number;
}

export const Chat = () => {
    const [chatList, setChatList] = useState([] as ChatMessage[]);
    let liKey = -1;

    const [placeholder, setPlaceholder] = useState(
        "You can chat with this thing."
    );

    const aMutation = reactAPI.channel.a.useMutation();
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

    const onData = (data: ChatMessage) => {
        setChatList([...chatList, data]);
    };

    reactAPI.channel.ws.useSubscription(undefined, {
        onData
    });

    return (
        <div
            id="chat"
            className="w-screen p-5 m-2 mb-1 bg-white/5 filter rounded-lg absolute bottom-16"
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
                                {msg.a}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <input
                type="text"
                id="chat-input"
                name="chat-input"
                className="transition-colors bg-white/5 w-full rounded-md mt-2 px-2 py-1 border-2 border-white/0 focus:outline-none focus:border-yellow-400/70"
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={inputValue}
            />
        </div>
    );
};
