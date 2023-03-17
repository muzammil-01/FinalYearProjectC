import React, { useState } from "react";
import Modal from "react-modal";
import {DaoFactoryABI  ,  DaoFactoryAddress,DaoFactoryBytcode} from "../../Redux/constants/daoFactoryABI";
import { ethers } from "ethers";

Modal.setAppElement("#root");

function CreateDaoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [owner, setOwner] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [daoAddress, setDaoAddress] = useState();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCreateDao = async () => {
    console.log("MEN HUN");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factoryContract = new ethers.Contract(`0x5B3dDE0e37D0C2c339C95950713D78DC9fB64aCB`, DaoFactoryABI, signer);
    const tx = await factoryContract.createDao();
    setTransactionHash(tx.hash);
    const receipt = await tx.wait();
    console.log(receipt);
    const events = receipt.events.filter((event) => event.event === "DaoAdd");
    console.log(events);
    const createdDaoEvent = events[0];
    console.log(createdDaoEvent);
    const createdDaoAddress = createdDaoEvent.args[0];
    console.log(createdDaoAddress);
    // const latestAddress = await factoryContract.getLatestDeployedDao()
    setDaoAddress(createdDaoAddress);
    // console.log(latestAddress);


    const etherscanApiKey = 'XEBXMGZBN6B7A2K42913W3GS5TKC3I4X2Y';
    const etherscanProvider = new ethers.providers.EtherscanProvider('goerli', etherscanApiKey);
    const contractCode = DaoFactoryBytcode + DaoFactoryABI;
    const publishedContract = await etherscanProvider.publishContract(contractCode);
    console.log(`Contract published on Etherscan at: https://https://goerli.etherscan.io//address/${daoAddress}#code`);
    // props.onDaoCreated(createdDaoAddress);
    handleCloseModal();
  };

  return (
    <>
      <button onClick={handleOpenModal}>Create DAO</button>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <h2>Create DAO</h2>
        <label>Owner Address:</label>
        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
        <br />
        <button onClick={handleCreateDao}>Create</button>
        <button onClick={handleCloseModal}>Cancel</button>
        {transactionHash && (
          <div>
            <label>Transaction Hash:</label>
            <a href={`https://goerli.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer">
              {transactionHash}
            </a>
          </div>
        )}
        {daoAddress && (
          <div>
            <label>DAO Address:</label>
            <a href={`https://goerli.etherscan.io/address/${daoAddress}`} target="_blank" rel="noreferrer">
              {daoAddress}
            </a>
          </div>
        )}
      </Modal>

      <div>
        {daoAddress && <a href="https://goerli.etherscan.io/address/0xe3ECED429A73b05A810cfd56e36ABA6a3d58366c#readContract">View Your Dao On ETHERSCAN</a>}
      </div>
    </>
  );
}

export default CreateDaoModal;