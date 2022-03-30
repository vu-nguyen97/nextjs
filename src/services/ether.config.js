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

  const targetAddress = "0xb7f7db91185Cfab10cCDcB5Ab5d8D0bf8C784540";

  var contractAddress = "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd";
  var contractAbiFragment = [
    {
      name: "transfer",
      type: "function",
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          type: "uint256",
          name: "_tokens",
        },
      ],
      constant: false,
      outputs: [],
      payable: false,
    },
  ];

  const usdtContract = new ethers.Contract(
    contractAddress,
    contractAbiFragment,
    provider.getSigner()
  );

  // How many tokens?
  const numberOfDecimals = 18;
  const numberOfTokens = ethers.utils.parseUnits("1.0", numberOfDecimals);

  // Send tokens
  usdtContract.transfer(targetAddress, numberOfTokens).then(
    () => {},
    (err) => {
      if (err?.code === -32603 && err?.data?.message) {
        const { message } = err.data;
        const content = message.charAt(0).toUpperCase() + message.slice(1);

        toast(content, { type: "error" });
      }
    }
  );
}

const etherConfig = {
  createTransaction,
  getAccount,
};

export default etherConfig;
