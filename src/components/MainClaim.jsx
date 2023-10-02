import React, { useState } from 'react';
  
import { ethers } from "ethers";// Import ethers from the correct location

// Replace with your contract address
const contractAddress = '0x19245c96E1Ada2F28d55099A7ebBd1452434c770';

const MainClaim = ({ accounts, setAccounts }) => {
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    try {
      setClaiming(true);

      if (window.ethereum) {
        console.log('Ethereum provider is available.');

        // Request account access using eth_requestAccounts
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Set the connected accounts
        setAccounts(accounts);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, [], signer);

        // Call the mint function
        const transaction = await contract.mint();
        await transaction.wait();
      } else {
        console.error('Ethereum provider not found.');
      }

      setClaiming(false);
    } catch (error) {
      console.error('Error claiming:', error);
      setClaiming(false);
    }
  };

  return (
    <div className='w-full h-screen flex items-start justify-center'>
      <div className='max-w-[1240px] mx-auto px-4'>
        <div className='md:pt-20 pt-15'>
          <div className='bg-opacity-50 backdrop-blur-lg mx-auto text-white my-20 py-5 rounded-lg'>
            <h1 className='text-2xl md:text-4xl text-center pb-3 text-white font-semibold'>
              Get your free mint
            </h1>
            <h2 className='text-2xl md:text-4xl text-[#e3c066] font-semibold'>
              Only Possible On Ethereum
            </h2>
            <div className='flex items-center justify-center mt-4'>
              <button
                className='Btn'
                onClick={handleClaim} // Call the handleClaim function when the button is clicked
                disabled={claiming} // Disable the button during the minting process
              >
                {claiming ? 'Claiming...' : 'Claim'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainClaim;
