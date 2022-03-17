import { toast } from "react-toastify";
import { ethers } from "ethers";

let accounts = [];

async function getAccount() {
  accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function createTransaction(priceValue = 1) {
  // const url = "http://192.168.99.9:7546";
  // const url = "http://192.168.99.42:9999";

  // const provider = new ethers.providers.JsonRpcProvider(url);

  // const signer = provider.getSigner();
  // const address = await signer.getAddress();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const address = await provider.send("eth_requestAccounts", []);

  if (!address) {
    return toast("Please install Metamask to continue paying", {
      type: "warning",
    });
  }

  console.log("address", address, accounts);
  // if (accounts[0] && address[0] !== accounts[0]) {
  //   window.location.reload();
  // }

  if (!accounts.length) {
    return getAccount();
  }

  const balance = await provider.getBalance(accounts[0]);
  const decimalBalance = ethers.utils.formatEther(balance);

  if (Number(decimalBalance) < priceValue) {
    return toast(
      "You don't have enough money. Check your balance before you try again.",
      {
        type: "error",
      }
    );
  }

  const params = [
    {
      from: accounts[0],
      to: "0xf6C73a2A5D22189e67c406eDC7D41f7ba41dEa86",
      value: (priceValue * Math.pow(10, 18)).toString(16),
      gas: (1000000).toString(16),
    },
  ];

  const transactionHash = await provider.send("eth_sendTransaction", params);
  console.log("transactionHash is " + transactionHash);
}

const etherConfig = {
  createTransaction,
  getAccount,
};

export default etherConfig;
