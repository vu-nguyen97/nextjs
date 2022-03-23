import { toast } from "react-toastify";
import { ethers } from "ethers";
import { addAdr } from "@redux/slices/metamask";
import storeInstance from "@redux/store";

let accounts = [];

async function getAccount() {
  window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
    accounts = res;
    storeInstance.store.dispatch(addAdr(res));
  });
}

async function createTransaction(priceValue = 1) {
  // const url = "http://192.168.99.9:7546";
  // const url = "http://192.168.99.42:9999";

  // const provider = new ethers.providers.JsonRpcProvider(url);

  // const signer = provider.getSigner();
  // const address = await signer.getAddress();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const address = await provider.send("eth_requestAccounts", []);
  const metamaskAccs = storeInstance.store.getState()?.metamask;

  if (typeof window.ethereum === "undefined" || !address) {
    return toast("Please install Metamask to continue paying", {
      type: "warning",
    });
  }

  window.ethereum.on("accountsChanged", function (accounts) {
    // Time to reload your interface with accounts[0]!
    window.location.reload();
  });

  window.ethereum.on("chainChanged", function (networkId) {
    // Time to reload your interface with the new networkId
    window.location.reload();
  });

  if (!accounts.length) {
    return getAccount();
  }

  if (!metamaskAccs.length) {
    return storeInstance.store.dispatch(addAdr(accounts));
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
      to: "0x5097d57A068f00db16D6d3AafA2dD97C46bb05F5",
      value: (priceValue * Math.pow(10, 18)).toString(16),
      gas: (1000000).toString(16),
    },
  ];

  const transactionHash = await provider.send("eth_sendTransaction", params);
}

const etherConfig = {
  createTransaction,
  getAccount,
};

export default etherConfig;
