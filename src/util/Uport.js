import { Connect, SimpleSigner, MNID } from "uport-connect";

const uport = new Connect("RefugeID", {
  clientId: "2oy45hJBBvH3oGNcK6Hq9681un46EvtfRSD",
  network: "rinkeby",
  signer: SimpleSigner(
    "30a401ea3f770cb8c4e1b592417b7de1b592e537bb23317b0c8311ae95d514bc"
  )
});

const uport2 = new Connect("RefugeID", {
  clientId: "2oy45hJBBvH3oGNcK6Hq9681un46EvtfRSD",
  network: "rinkeby",
  signer: SimpleSigner(
    "30a401ea3f770cb8c4e1b592417b7de1b592e537bb23317b0c8311ae95d514bc"
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
  console.log("admin", specificNetworkAddress);
  return { specificNetworkAddress, userProfile };
};

export const initRefugeeAccount = async () => {
  const userProfile = await uport2.requestCredentials({
    requested: ["name", "country", "avatar"],
    notifications: true // We want this if we want to recieve credentials
  });
  const decodedId = MNID.decode(userProfile.address);
  const specificNetworkAddress = decodedId.address; //this is the users account  address
  console.log("refugee", specificNetworkAddress);
  return specificNetworkAddress;
};

export const attestRefugee = async () => {
  uport2.attestCredentials({
    sub: "THE_RECEIVING_UPORT_ADDRESS",
    claim: {
      RegugeIDAccess: true
    },
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days from now
  });
};

const web3 = uport.getWeb3();
export { web3, uport, MNID, initAccount, uport2 };
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
