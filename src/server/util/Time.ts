export class Time {
    public static getHHMMSS(t: number = Date.now()) {
        const ms = t;
        const s = ms / 1000;
        const m = s / 60;
        const h = m / 60;

        const hh = Math.floor(h) % 12;
        const mm = Math.floor(h) % 60;
        const ss = Math.floor(h) % 60;

        return `${hh}:${mm}:${ss}`;
    }
}
