# Overview

This repo is our submission for the ethDenver Hackathon.
RefugeID is a decentralized platform for storing the identity, documentation, and movement of displaced individuals around the world.

[Medium Article covering EthDenver and RefugeeID](https://medium.com/amentum/ethdenver-creating-social-impact-through-community-technology-e74dba2610fe)

#### Tools used:

`React` (Based on Create-react-app: https://github.com/facebookincubator/create-react-app)
`Redux` for state management https://redux.js.org/
`Truffle` For contract compiling/migrating http://truffleframework.com/
`Solidity` for smart contracts on Ethereum https://solidity.readthedocs.io
`web3` To allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection. https://github.com/ethereum/wiki/wiki/JavaScript-API
<br/>`truffle-contract` To make it easier to work with your contracts. https://github.com/trufflesuite/truffle-contract

## Development Setup

* Install truffle globally using: `npm install -g truffle`

* You will need the to download uPort on your mobile device to log in. https://www.uport.me/

## Working with contracts

* All contracts and files realated to Ethereum are in directory: `src/ethereum`

#### Local Development

* For local development: cd to directory `src/ethereum` and run `truffle develop`
* Command to compile contracts: `compile`
* Command to migrate contracts: `migrate`
* Command to run tests for the contracts: `test`
* To switch between uPort and Metamask, uncomment web3 declerations in Accounts.js (line 24) and TodoServices.js (lines 2, 3)

* Note:`truffle develop` runs a local test node on localhost:9545 `truffle develop` Needs to be running when interacting with your contracts
* Metamask needs to point to localhost:9545 For directions, read here under title "USING METAMASK WITH TRUFFLE DEVELOP" http://truffleframework.com/docs/advanced/truffle-with-metamask

## Working with React/Redux

* Command for running the front end: `yarn start`
* Command for connecting to the Ropsten test network: `truffle migrate --network ropsten`
  Make sure that on MetaMask you are connected to Ropsten as well (keep in mind that this network is share with everyone using this network, so we can all see those todo's you will put up there).
* for running on the Rinkeby network so you use Uport run `truffle compile` and then `truffle migrate --network rinkeby`
