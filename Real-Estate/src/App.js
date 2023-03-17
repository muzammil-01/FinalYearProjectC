import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Marketplace from './pages/marketplace/Marketplace';
import PropertyDetails from './pages/propertyDetails/PropertyDetails';
import Signup from './pages/Signup/Signup';
import Details from './pages/details/Details';
import Bid from './pages/bid/Bid';
import TokensForSale from './pages/tokenforsale/TokensForSale';
import Financials from './pages/financials/Financials';
import Profile from './pages/profile/Profile';
import AddProperty from './pages/addPropertyForm/AddProperty'
import SearchPage from './pages/searchPage/SearchPage';
import { WagmiConfig, createClient, configureChains, goerli } from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
// import { InfuraProvider } from '@ethersproject/providers';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { InfuraProvider } from '@ethersproject/providers';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  // [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
  [infuraProvider({apiKey:"b73b694847074040821c91a44993b706"}), publicProvider()]
)

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
})
function App() {
  return (
    <WagmiConfig client={client}>
    <div className="App">
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='addproperty' element={<AddProperty />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="propertydetails/:id" element={<PropertyDetails />}>
          <Route path='financials' element={<Financials />} />
          <Route path='details' element={<Details />} />
          <Route path="bid" element={<Bid />} />
          <Route path="tokensforsale" element={<TokensForSale />} />
          </Route>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </WagmiConfig>
  );
}

export default App;
