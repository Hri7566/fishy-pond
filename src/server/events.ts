import EventEmitter from "events";

export const eventBus = new EventEmitter();
export type EventCallback = (msg: any) => void;
