import EventEmitter from "events";
import { Participant, ServerEvents } from "./ServerEventBus";

export interface ChannelInfo {
    // Don't include users
    id: string;
    nearby: string[];
}

export class Channel extends EventEmitter {
    public static channels = new Map<Channel["id"], Channel>();

    public static addChannel(channel: Channel) {
        this.channels.set(channel.id, channel);
    }

    public static removeChannel(channelId: string) {
        this.channels.delete(channelId);
    }

    public static getChannelList() {
        let list = new Array<ChannelInfo>();

        for (const [id, channel] of this.channels) {
            list.push(channel.getInfo());
        }

        return list;
    }

    public chatHistory: ServerEvents["chat"][] = [];
    public usersInChannel: string[] = [];
    public nearbyChannels: string[] = [];

    constructor(public id: string, ...nearby: string[]) {
        super();
        this.nearbyChannels.push(...nearby);

        Channel.channels.set(this.id, this);
    }

    /**
     * Check if a user is in this channel
     * @param userId User's ID
     * @returns Whether or not the user is in this channel
     */
    public hasUser(userId: string) {
        return this.usersInChannel.indexOf(userId) !== -1;
    }

    /**
     * Add a user to this channel
     * @param userId User ID
     * @returns Whether or not the operation was successful
     */
    public addUser(userId: string): boolean {
        if (this.hasUser(userId)) return false;
        this.usersInChannel.push(userId);
        return true;
    }

    /**
     * Remove a user from the channel
     * @param userId User ID
     * @returns Whether or not the operation was successful
     */
    public removeUser(userId: string): boolean {
        if (!this.hasUser(userId)) return false;
        this.usersInChannel.splice(this.usersInChannel.indexOf(userId), 1);
        return true;
    }

    /**
     * Get channel information
     * @returns Channel information
     */
    public getInfo(): ChannelInfo {
        return {
            id: this.id,
            nearby: this.nearbyChannels
        };
    }
}
