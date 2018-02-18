import { Connect, SimpleSigner, MNID } from "uport-connect";

const uport = new Connect("EthDenver Refugee Identity", {
  clientId: "2oxgbuGDiahQB52K2iu1QWKA6KdVXtmrfoe",
  network: "rinkeby",
  signer: SimpleSigner(
    "62388533966a25b565f5614547a56d51754eabf216d9e9a7405391b571c9a97f"
  )
});

const initAccount = async () => {
  const userProfile = await uport.requestCredentials({
    requested: ["name", "country", "avatar"],
    notifications: true // We want this if we want to recieve credentials
  });
  // Do something with user identity
  const decodedId = MNID.decode(userProfile.address);
  const specificNetworkAddress = decodedId.address; //this is the users account  address
  console.log("contact: ", userProfile);
  console.log("specificNetworkAddressL ", specificNetworkAddress);
  return { specificNetworkAddress, userProfile };
};

export const transfer = async () => {
  const userProfile = await uport.requestCredentials({
    requested: ["name", "country", "avatar"],
    notifications: true // We want this if we want to recieve credentials
  });

  return userProfile;
};

const initRefugeeAccount = async () => {
  const userProfile = await uport.requestCredentials({
    requested: ["name", "country", "avatar"],
    notifications: true // We want this if we want to recieve credentials
  });
  //have addresss
};

const web3 = uport.getWeb3();
export { web3, uport, MNID, initAccount };
// Attest specific credentials
/*
uport.attestCredentials({
    sub: THE_RECEIVING_UPORT_ADDRESS,
    claim: {
        CREDENTIAL_NAME: CREDENTIAL_VALUE
    },
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})
*/
