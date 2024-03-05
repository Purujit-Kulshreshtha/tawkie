import CreateChannelModal from '../components/CreateChannel';
import JoinChannel from '../components/JoinChannel';

function AddChannel() {
  return (
    <div className="h-screen w-full bg-dark-500 flex flex-col justify-evenly items-center">
      <JoinChannel />
      <CreateChannelModal />
    </div>
  );
}

export default AddChannel;
