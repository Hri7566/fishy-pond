import React, { useState } from "react";
import { ChannelInfo } from "../../../server/Channel";
import { reactAPI } from "../../api/trpc";
import type { ServerEvents } from "../../../server/ServerEventBus";
import type { ServerError } from "../../../server/api/errors";

export const ChannelSelector = () => {
    const [channelListVisibility, setChannelListVisiblity] = useState(false);
    const setChannelMutation = reactAPI.channel.setChannel.useMutation();

    const setChannel = (channelId: string) => {
        // Send channel message
        setChannelMutation.mutate({ channelId });

        // Hide list
        setChannelListVisiblity(false);
    };

    const channelInfo = reactAPI.channel.getChannelInfo.useQuery();
    const channelInfoHadError = channelInfo.data
        ? (channelInfo.data as ServerError).status == "error"
        : false;

    const channelList = reactAPI.channel.getChannelList.useQuery();

    return (
        <div className="select-none cursor-pointer min-w-[256px] max-w-[256px] p-1 bg-white/5 rounded-md border-[1px] border-white/5 shadow">
            <div
                className="grid justify-items-start"
                onClick={() => {
                    setChannelListVisiblity(!channelListVisibility);
                }}
            >
                <p>
                    {channelInfoHadError
                        ? "--"
                        : channelInfo
                        ? channelInfo.data
                            ? (channelInfo.data as ChannelInfo).id
                            : "--"
                        : "--"}
                </p>
                <div className="justify-self-end absolute">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            {channelListVisibility ? (
                <div
                    id="channel-list"
                    className="px-2 py-1 left-1 block absolute bottom-full w-full overflow-hidden overflow-y-scroll max-h-[600px] bg-white/5 backdrop-blur border-[1px] border-white/5 shadow max-w-[256px] min-w-[256px] rounded-md"
                >
                    {channelList.data ? (
                        channelList.data.map(channelInfo => {
                            return (
                                <div
                                    key={channelInfo.id}
                                    className="px-2 py-1 rounded-md border-[1px] border-white/0 hover:bg-white/5 hover:border-white/5 hover:shadow transition-all"
                                    onClick={() => {
                                        setChannel(channelInfo.id);
                                    }}
                                >
                                    <p>{channelInfo.id}</p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-2 bg-white/5 rounded-md">
                            <p>No channels</p>
                        </div>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
