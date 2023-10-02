import React, { useState } from 'react';


const Navbar = ({ accounts, setAccounts }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      try {
        setIsConnecting(true);

        // Requesting account access from MetaMask
        const connectedAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccounts(connectedAccounts);

        // Creating an Ethereum provider and account signer


        // Now you can use the 'signer' to interact with the connected account
        // For example, you can sign transactions or messages

      } catch (error) {
        console.error('Error connecting account:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      console.error('MetaMask is not available');
    }
  }

  return (
    <div className='w-full text-white  bg-opacity-50 backdrop-blur-lg bg-gray-800' >
      <div className='max-w-[1240px] mx-auto p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-[#e3c066] '>OPOE</h1>
          </div>
          <div>
            {isConnected ? (
              <p className='Btn rounded-3xl px-3 py-2'>{`${accounts[0].slice(0, 4)}...${accounts[0].slice(-4)}`}</p>
            ) : (
              <button className='Btn' onClick={connectAccount}>
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;