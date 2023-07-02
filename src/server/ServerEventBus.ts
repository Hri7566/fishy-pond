import EventEmitter from "events";
import { EventSubscriber } from "./EventSubscriber";
import { type Observer } from "@trpc/server/observable";
import { type Context } from "./api/trpc";

export type EventCallback<EventID extends keyof ServerEvents> = (
    msg: ServerEvents[EventID]
) => void;

class ServerEventBus extends EventEmitter {
    constructor() {
        super();
    }

    public on<EventID extends keyof ServerEvents>(
        event: EventID,
        listener: EventCallback<EventID>
    ): this {
        super.on(event, listener);
        return this;
    }

    public off<EventID extends keyof ServerEvents>(
        event: EventID,
        listener: EventCallback<EventID>
    ): this {
        super.off(event, listener);
        return this;
    }

    public once<EventID extends keyof ServerEvents>(
        event: EventID,
        listener: EventCallback<EventID>
    ): this {
        super.once(event, listener);
        return this;
    }

    public emit<EventID extends keyof ServerEvents>(
        event: EventID,
        ...args: Parameters<EventCallback<EventID>>
    ): boolean {
        return super.emit(event, ...args);
    }

    // Subscription handler

    protected subscribers = new Map<
        Context["participantId"],
        EventSubscriber
    >();

    public subscribe(
        partId: Context["participantId"],
        emit: Observer<unknown, unknown>,
        ctx: Context
    ) {
        const eventSubscriber = new EventSubscriber(emit, ctx);
        this.subscribers.set(partId, eventSubscriber);

        for (const eventId of Object.keys(eventSubscriber.events)) {
            const eventCallback =
                eventSubscriber.events[eventId as keyof ServerEvents];
            this.on(eventId as keyof ServerEvents, msg => {
                if (eventSubscriber.isDestroyed()) return;
                eventCallback(msg);
            });
        }

        return eventSubscriber;
    }

    public unsubscribe(partId: Context["participantId"]) {
        const eventSubscriber = this.subscribers.get(partId);
        eventSubscriber?.destroy();
        this.subscribers.delete(partId);
    }

    public getSubscriber(partId: Context["participantId"]) {
        const eventSubscriber = this.subscribers.get(partId);
        return eventSubscriber;
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

export type ServerEventMap = {
    [EventID in keyof ServerEvents]: (msg: ServerEvents[EventID]) => void;
};

export interface ServerEvents {
    chat: {
        m: "chat";
        message: string;
        t: number;
        p: Participant;
        channel: string;
    };
}
