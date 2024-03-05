import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ChannelContext } from '../context/ChannelContext';

function Sidebar() {
  const navigate = useNavigate();

  const { channelsIn } = useContext(UserContext);
  const { setChannel } = useContext(ChannelContext);
  const channels = channelsIn?.value;

  const selectChannel = (channelName: string) => {
    setChannel(channelName);
  };

  return (
    <div className="h-screen w-1/6 bg-medium-500 flex flex-col justify-start items-center py-8">
      {channels &&
        channels.length >= 1 &&
        channels.map((channel) => {
          return (
            <button
              type="button"
              onClick={() => selectChannel(channel)}
              key={channel}
              className="m-2 bg-accent-500 p-2 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white text-3xl shadow-md text-center cursor-pointer"
            >
              {channel[0]}
            </button>
          );
        })}
      <button
        type="button"
        onClick={() => navigate('/add')}
        className="m-2 bg-dark-500 p-2 pb-3 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white text-3xl shadow-md  cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default Sidebar;
