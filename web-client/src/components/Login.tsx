import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const user = await result.json();
    if (user.message && user.message !== "") {
      setError(user.message);
      return;
    }
    setUser(user);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-dark-500">
      <h1 className="text-white text-4xl m-4 absolute top-0">Tawkie</h1>

      <div className="flex flex-col bg-medium-500 p-4 justify-evenly items-center w-10/12 shadow-md">
        <h1 className="text-white text-4xl m-4">Login</h1>
        <form
          onSubmit={createUser}
          className="flex flex-col justify-center items-center m-4 p-2"
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            value={username}
            className="border-dark-500 border-[2px] rounded p-1 px-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!username || username === ""}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-accent-500 border border-accent-500 rounded-md shadow-sm hover:bg-border-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:text-gray-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
