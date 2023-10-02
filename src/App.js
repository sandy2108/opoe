
import { useState } from 'react';
import Navbar from './components/Navbar';
import MainClaim from './components/MainClaim';

function App() {

  const [accounts,setAccounts] = useState([]);


  return (
    <div className="herobg">
    
      <Navbar accounts={accounts} setAccounts={setAccounts}/>
      <MainClaim accounts={accounts} setAccounts={setAccounts}/>
    </div>
  );
}

export default App;