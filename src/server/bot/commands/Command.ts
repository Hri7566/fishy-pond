// TODO finish command callback
export type CommandCallback = () =>
    | Promise<string | undefined>
    | string
    | undefined;

export class Command {
    constructor(
        public id: string,
        public aliases: string[],
        public callback: CommandCallback
    ) {}
}
