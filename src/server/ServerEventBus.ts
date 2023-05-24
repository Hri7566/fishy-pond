import EventEmitter from "events";

export type EventCallback = (msg: ServerEvents[keyof ServerEvents]) => void;

class ServerEventBus extends EventEmitter {
    constructor() {
        super();
    }

    public on<EventID extends keyof ServerEvents>(
        event: EventID,
        listener: EventCallback
    ): this {
        super.on(event, listener);
        return this;
    }

    public off<EventID extends keyof ServerEvents>(
        event: EventID,
        listener: EventCallback
    ): this {
        super.off(event, listener);
        return this;
    }

    public once<EventID extends keyof ServerEvents>(
        event: EventID,
        listener: EventCallback
    ): this {
        super.once(event, listener);
        return this;
    }

    public emit<EventID extends keyof ServerEvents>(
        event: EventID,
        ...args: Parameters<EventCallback>
    ): boolean {
        return super.emit(event, ...args);
    }
}

export const serverEventBus = new ServerEventBus();

export interface User {
    _id: string;
    name: string;
    color: string;
}

export interface Participant extends User {
    id: string;
}

export interface ServerEvents {
    hi: {
        m: "hi";
    };
    chat: {
        m: "chat";
        a: string;
        t: number;
        p: Participant;
    };
}
