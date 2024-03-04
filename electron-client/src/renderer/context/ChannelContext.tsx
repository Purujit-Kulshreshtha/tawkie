import { ReactElement, createContext, useEffect, useMemo } from 'react';
import { Channel } from '../types';
import { IContextValue, useIContext } from './contextValue';

const backendUrl = 'http://localhost:8080';

type ChannelContextType = {
  channelName?: IContextValue<string>;
  members?: IContextValue<string[]>;
  owner?: IContextValue<string>;
  setChannel: (channelName: string, callback?: () => void) => void;
  clear: () => void;
};

interface Props {
  children: ReactElement;
}

const fetchChannel = async (channelName: string): Promise<Channel> => {
  const url = `${backendUrl}/channels/${channelName}`;
  const fetchedChannel = await (await fetch(url)).json();
  return fetchedChannel;
};

export const ChannelContext = createContext<ChannelContextType>({
  setChannel: () => true,
  clear: () => 0,
});

export function ChannelContextProvider({ children }: Props) {
  const currentChannel: Channel = JSON.parse(
    localStorage.getItem('channel') || `{}`,
  );

  const channelName = useIContext<string>(currentChannel.channelName || '');
  const members = useIContext<string[]>(currentChannel.members || ['']);
  const owner = useIContext<string>(currentChannel.owner || '');

  const value: ChannelContextType = useMemo(() => {
    return {
      channelName,
      members,
      owner,

      setChannel: async (selectedChannel: string, callback) => {
        const fetchedChannel: Channel = await fetchChannel(selectedChannel);

        channelName.setValue(fetchedChannel.channelName);
        members.setValue(fetchedChannel.members);
        owner.setValue(fetchedChannel.owner);

        localStorage.setItem('channel', JSON.stringify(fetchedChannel));
        if (callback) {
          callback();
        }
      },

      clear: () => {
        channelName.clear();
        members.clear();
        owner.clear();
        localStorage.removeItem('channel');
      },
    };
  }, [channelName, members, owner]);

  useEffect(() => {
    const getAndSetUser = async () => {
      if (value.channelName && value.channelName.value !== '') {
        value.setChannel(value.channelName.value || '');
      }
    };
    getAndSetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  );
}
