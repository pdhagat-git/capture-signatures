import type { NextPage } from 'next';
import { ConnectKitButton } from 'connectkit';

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ConnectKitButton theme='midnight'/>
    </div>
  );
};

export default Home;