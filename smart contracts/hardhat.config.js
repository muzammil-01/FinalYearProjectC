require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();
module.exports = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/674811bc96a2482d90a8fc0ad48a93e3",
      accounts: ["73d96a1f681f84fa872fe740e727a8aec8f54c341b213eb7323af6331344aaa8"],
    },
  },
};