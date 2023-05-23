import { Command } from "./commands/Command";

export class Bot {
    public commands: Map<Command["id"], string> = new Map();

    constructor(public id: string) {}

    public addCommand() {
        throw new Error("Method not implemented.");
    }
}
