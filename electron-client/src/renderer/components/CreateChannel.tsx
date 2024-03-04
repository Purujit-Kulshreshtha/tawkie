import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { ChannelContext } from '../context/ChannelContext';

const backendUrl = 'http://localhost:8080';

function CreateChannel() {
  const [channelName, setChannelName] = useState('');
  const { username } = useContext(UserContext);
  const { setChannel } = useContext(ChannelContext);
  const [error, setError] = useState<string | null>(null);

  const createChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const result = await fetch(`${backendUrl}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelName,
        owner: username?.value,
      }),
    });
    const newChannel = await result.json();
    if (newChannel.message && newChannel.message !== '') {
      setError(newChannel.message);
      return;
    }
    setChannel(newChannel.channelName);
    window.location.reload();
  };
  return (
    <div className="bg-light-500 rounded-xl px-10 py-5 shadow-xl w-9/12">
      <h1 className="text-3xl text-accent-500 font-extrabold text-center">
        Create a Channel
      </h1>
      <form
        onSubmit={createChannel}
        className="flex flex-col justify-center items-center m-4"
      >
        <input
          onChange={(e) => setChannelName(e.target.value)}
          value={channelName}
          placeholder="Channel Name"
          className="border-dark-500 border-[2px] rounded p-1 px-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={!channelName || channelName === ''}
          className="mt-4 inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-accent-500 border border-accent-500 rounded-md hover:bg-border-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:text-gray-300 shadow-md"
        >
          Create Chanel
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;
