export type Channel = {
  channelName: string; //unique
  members: string[]; //usernames
  owner: string; //
};

export type User = {
  username: string; //unique
  channelsIn: string[];
};
