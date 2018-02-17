import { Connect, SimpleSigner, MNID } from 'uport-connect'

const uport = new Connect('Todo DApp', {
    clientId: '2oxQ33MUXYP6w3uYAzPyGWpRnZjhTfwUFEy',
    network: 'rinkeby',
    signer: SimpleSigner('676b366dd903fe7d09ed6f30771515035ccb2c280abd52b63f43aed308d5c23c')
})

const initAccount = async () => {
    const userProfile = await uport.requestCredentials({
        requested: ['name', 'country', 'avatar'],
        notifications: true // We want this if we want to recieve credentials
    })
    // Do something with user identity
    const decodedId = MNID.decode(userProfile.address)
    const specificNetworkAddress = decodedId.address //this is the users account  address
    console.log('contact: ', userProfile);
    console.log('specificNetworkAddressL ', specificNetworkAddress);
    return { specificNetworkAddress, userProfile }
}

const web3 = uport.getWeb3()
export { web3, uport, MNID, initAccount }
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