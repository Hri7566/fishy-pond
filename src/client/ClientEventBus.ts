import EventEmitter from "events";

export type EventCallback<Event extends keyof IncomingClientEvents> = (
    msg: IncomingClientEvents[Event]
) => void;

class ClientEventBus extends EventEmitter {
    constructor() {
        super();
    }

    public on<Event extends keyof IncomingClientEvents>(
        event: Event,
        listener: EventCallback<Event>
    ): this {
        super.on(event, listener);
        return this;
    }

    public off<Event extends keyof IncomingClientEvents>(
        event: Event,
        listener: EventCallback<Event>
    ): this {
        super.off(event, listener);
        return this;
    }

    public once<Event extends keyof IncomingClientEvents>(
        event: Event,
        listener: EventCallback<Event>
    ): this {
        super.once(event, listener);
        return this;
    }

    public emit<Event extends keyof IncomingClientEvents>(
        event: Event,
        ...args: Parameters<EventCallback<Event>>
    ): boolean {
        return super.emit(event, ...args);
    }
}

export const clientEventBus = new ClientEventBus();

export interface User {
    _id: string;
    name: string;
    color: string;
}

export interface Participant extends User {
    id: string;
}

export interface IncomingClientEvents {
    chat: {
        m: string;
        a: string;
        t: number;
        p: Participant;
    };
}

export interface OutgoingClientEvents {
    chat: {
        
    }
}
