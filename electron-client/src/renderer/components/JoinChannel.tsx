import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { User } from '../types';

const backendUrl = 'http://localhost:8080';

function JoinChannel() {
  const [channelName, setChannelName] = useState('');
  const { username, channelsIn, setUser } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  const joinChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // get channel
    const getChannelResult = await fetch(
      `${backendUrl}/channels/${channelName}`,
    );
    const existingChannel = await getChannelResult.json();

    if (existingChannel.message && existingChannel.message !== '') {
      setError(existingChannel.message);
      return;
    }
    if (existingChannel.members.includes(username?.value)) {
      setError('User already exists in channel');
      return;
    }

    // update channel
    const updatedChannelResult = await fetch(
      `${backendUrl}/channels/${channelName}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: {
            channelName,
            members: [...existingChannel.members, username?.value],
            owner: existingChannel.owner,
          },
        }),
      },
    );
    const updatedChannel = await updatedChannelResult.json();
    if (updatedChannel.message && updatedChannel.message !== '') {
      setError(updatedChannel.message);
      return;
    }

    // update user
    const userToUpdate: User = {
      username: username?.value || '',
      channelsIn: [...(channelsIn?.value || []), updatedChannel.channelName],
    };
    const updatedUserResult = await fetch(
      `${backendUrl}/users/${username?.value}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userToUpdate,
        }),
      },
    );
    const updatedUser = await updatedUserResult.json();

    // set channel context
    setUser(updatedUser);
  };
  return (
    <div className="bg-light-500 rounded-xl px-10 py-5 shadow-xl w-9/12">
      <h1 className="text-3xl text-accent-500 font-extrabold text-center">
        Join a Channel
      </h1>
      <form
        onSubmit={joinChannel}
        className="flex flex-col justify-center items-center m-4"
      >
        <input
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Channel Name"
          className="border-dark-500 border-[2px] rounded p-1 px-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          // disabled={!username || username === ''}
          className="mt-4 inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-accent-500 border border-accent-500 rounded-md hover:bg-border-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:text-gray-300 shadow-md"
        >
          Join Chanel
        </button>
      </form>
    </div>
  );
}

export default JoinChannel;
