import { useContext, useState } from "react";
import { ChannelContext } from "../context/ChannelContext";
import { UserContext } from "../context/UserContext";
import { Channel, User } from "../types";
import AudioControls from "../components/AudioControls";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function ShowChannel() {
  const { username } = useContext(UserContext);
  const { channelName, members, owner, setChannel, clear } =
    useContext(ChannelContext);
  const channelMembers = members?.value;
  const [error, setError] = useState<string | null>(null);

  if (!channelName || !channelName.value || channelName.value === "") {
    return (
      <div>
        <h1>Please select/add a channel</h1>
      </div>
    );
  }

  const deleteChannelHandler = async () => {
    setError(null);

    // delete channel
    await fetch(`${backendUrl}/channels/${channelName.value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // update user
    const existingUser: User = await (
      await fetch(`${backendUrl}/users/${username?.value}`)
    ).json();
    const userToUpdate: User = {
      username: username?.value || "",
      channelsIn: existingUser.channelsIn.filter(
        (c) => c !== channelName?.value
      ),
    };
    const updatedUserResult = await fetch(
      `${backendUrl}/users/${username?.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userToUpdate,
        }),
      }
    );
    const updatedUser = await updatedUserResult.json();
    if (updatedUser.message && updatedUser.message !== "") {
      setError(updatedUser.message);
      return;
    }

    clear();
    window.location.reload();
  };

  const leaveChannelHandler = async () => {
    setError(null);
    // update channel
    const channelToUpdate: Channel = {
      channelName: channelName?.value || "",
      members:
        members?.value?.filter((member) => member !== username?.value) || [],
      owner: owner?.value || "",
    };
    const updatedChannelResult = await fetch(
      `${backendUrl}/channels/${channelName?.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channelToUpdate,
        }),
      }
    );
    const updatedChannel = await updatedChannelResult.json();
    if (updatedChannel.message && updatedChannel.message !== "") {
      setError(updatedChannel.message);
      return;
    }

    // update user
    const existingUser: User = await (
      await fetch(`${backendUrl}/users/${username?.value}`)
    ).json();
    const userToUpdate: User = {
      username: username?.value || "",
      channelsIn: existingUser.channelsIn.filter(
        (c) => c !== channelName?.value
      ),
    };
    const updatedUserResult = await fetch(
      `${backendUrl}/users/${username?.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userToUpdate,
        }),
      }
    );
    const updatedUser = await updatedUserResult.json();
    if (updatedUser.message && updatedUser.message !== "") {
      setError(updatedUser.message);
      return;
    }

    clear();
    window.location.reload();
  };

  const removeMemberHandler = async (memberName: string) => {
    setError(null);

    // update channel
    const channelToUpdate: Channel = {
      channelName: channelName?.value || "",
      members: members?.value?.filter((member) => member !== memberName) || [],
      owner: owner?.value || "",
    };
    const updatedChannelResult = await fetch(
      `${backendUrl}/channels/${channelName?.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channelToUpdate,
        }),
      }
    );
    const updatedChannel = await updatedChannelResult.json();
    if (updatedChannel.message && updatedChannel.message !== "") {
      setError(updatedChannel.message);
      return;
    }

    // update user
    const existingUser: User = await (
      await fetch(`${backendUrl}/users/${memberName}`)
    ).json();
    const userToUpdate: User = {
      username: memberName || "",
      channelsIn: existingUser.channelsIn.filter(
        (c) => c !== channelName?.value
      ),
    };
    const updatedUserResult = await fetch(`${backendUrl}/users/${memberName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userToUpdate,
      }),
    });
    const updatedUser = await updatedUserResult.json();
    if (updatedUser.message && updatedUser.message !== "") {
      setError(updatedUser.message);
      return;
    }

    setChannel(updatedChannel.channelName, () => window.location.reload);
  };

  return (
    <div className="h-screen w-5/6 bg-dark-500">
      <h1 className="text-center text-white text-4xl font-extrabold">
        {channelName?.value}
      </h1>
      <h2 className="text-center text-black ">Created by {owner?.value}</h2>
      {error && <p className="text-red-500">{error}</p>}

      <AudioControls />

      <div className="grid grid-cols-3 bg-light-500 my-5">
        {channelMembers &&
          channelMembers.length >= 1 &&
          channelMembers.map((member) => {
            return (
              <div
                key={member}
                className="text-center flex flex-col justify-between items-center m-8 bg-white rounded-lg shadow-md shadow-gray-600 p-4"
              >
                <div className=" bg-accent-500 p-2 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white text-3xl shadow-md text-center cursor-pointer">
                  {member[0]}
                </div>
                <p>{member}</p>
                {username?.value === owner?.value && (
                  <button
                    type="button"
                    disabled={member === owner?.value}
                    onClick={() => removeMemberHandler(member)}
                    className="text-white text-sm uppercase p-2 bg-red-500 rounded-lg disabled:bg-red-300 shadow-sm shadow-gray-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
      </div>

      <div className="flex flex-col justify-center items-center">
        {username?.value === owner?.value ? (
          <>
            <button
              type="button"
              onClick={deleteChannelHandler}
              disabled={members?.value && members?.value?.length > 1}
              className="text-white uppercase p-2 bg-red-500 m-4 rounded-lg disabled:bg-red-300 shadow-sm shadow-gray-800"
            >
              Delete Channel
            </button>
            {members?.value && members?.value?.length > 1 && (
              <p>Remove all members from channel to delete room</p>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={leaveChannelHandler}
            className="text-white uppercase p-2 bg-red-500 m-4 rounded-lg disabled:bg-red-300 shadow-sm shadow-gray-800"
          >
            Leave Channel
          </button>
        )}
      </div>
    </div>
  );
}

export default ShowChannel;
