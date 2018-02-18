//switch web3 type below
//import { web3 } from '../util/web3Util';
import { web3 } from "../util/Uport";
import contract from 'truffle-contract';
import Refugee from '../ethereum/build/contracts/RefugeeIdentity.json';



const RefugeeContract = contract(Refugee);

RefugeeContract.setProvider(web3.currentProvider);

class Refugees {
  async getInstance() {
    const instance = await RefugeeContract.deployed();
    return instance;
  }

  async addPerson(userAddress, _fullName, _origin, _organization, _ipfs1, _ipfs2) {
    const instance = await this.getInstance();
    const items = await instance.addPerson(_fullName, _origin, _organization, _ipfs1, _ipfs2, { from: userAddress });
    return items;
  }

  async editPerson(userAddress, _id, _fullName, _origin, _organization, _ipfs1, _ipfs2) {
    const instance = await this.getInstance();
    const items = await instance.editPerson(_id, _fullName, _origin, _organization, _ipfs1, _ipfs2, { from: userAddress });
    return items;
  }

  async getOnePersonById(userAddress, _id) {
    const instance = await this.getInstance();
    const item = await instance.getOnePersonById(_id, { from: userAddress });
    return item;
  }

  async transferIdentityOwnership(userAddress, _refugeeAddress, _id) {
    const instance = await this.getInstance();
    const item = await instance.transferIdentityOwnership(_refugeeAddress, _id, { from: userAddress });
    return item;
  }

  async getAll() {
    const instance = await this.getInstance();
    const items = await instance.getAll();
    return items;
  }

}

export default new Refugees();