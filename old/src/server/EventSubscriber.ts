import { Observer } from "@trpc/server/observable";
import type { ServerEventMap } from "./ServerEventBus";
import { Context } from "./api/context";

export class EventSubscriber {
    public events: ServerEventMap = {
        chat: msg => {
            if (this.ctx.currentChannel !== msg.channel) return;
            this.send(msg);
        }
    };

    constructor(
        public observer: Observer<unknown, unknown>,
        public ctx: Context
    ) {}

    private destroyed = false;

    public destroy() {
        this.observer.complete();
        this.destroyed = true;
    }

    public isDestroyed() {
        return this.destroyed;
    }

    public send(data: unknown) {
        this.observer.next(data);
    }
}
