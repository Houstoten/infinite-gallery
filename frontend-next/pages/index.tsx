import type { NextPage } from 'next';
import Image from 'next/image';

import { Greeter } from '../components/Greeter';
import { Symfoni } from '../hardhat/SymfoniContext';

const Home: NextPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        
        <Symfoni autoInit={true} >
          <Greeter></Greeter>
        </Symfoni>
      </header>
    </div>
  )
}

export default Home
