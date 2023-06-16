import { Time } from "./Time";

type ColorCallback = (orig: string) => string;

export class Logger {
    public static log(method: string, ...args: any[]) {
        const hhmmss = Time.getHHMMSS();
        (console as unknown as Record<string, (...args: any[]) => void>)[
            method
        ](`[${hhmmss}]`, ...args);
    }

    constructor(
        public id: string,
        public color: ColorCallback = (orig: string) => `\x1b[35m${orig}\x1b[0m`
    ) {}

    public info(...args: any[]) {
        Logger.log("log", `[${this.color(this.id)}]`, ...args);
    }

    public error(...args: any[]) {
        Logger.log("error", `[${this.color(this.id)}]`, ...args);
    }

    public warn(...args: any[]) {
        Logger.log("warn", `[${this.color(this.id)}]`, ...args);
    }

    public debug(...args: any[]) {
        Logger.log("debug", `[${this.color(this.id)}]`, ...args);
    }
}
