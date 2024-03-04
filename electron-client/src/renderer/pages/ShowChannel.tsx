import { useContext } from 'react';
import { ChannelContext } from '../context/ChannelContext';

function ShowChannel() {
  const { channelName, members, owner } = useContext(ChannelContext);
  const channelMembers = members?.value;

  return (
    <div className="h-screen w-5/6 bg-dark-500">
      <h1 className="text-center text-white text-4xl">{channelName?.value}</h1>
      <h2 className="text-center text-black ">Created by {owner?.value}</h2>
      {channelMembers &&
        channelMembers.length >= 1 &&
        channelMembers.map((member) => {
          return (
            <div
              key={member}
              className="m-2 bg-accent-500 p-2 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white text-3xl shadow-md text-center cursor-pointer"
            >
              {member[0]}
            </div>
          );
        })}
    </div>
  );
}

export default ShowChannel;
