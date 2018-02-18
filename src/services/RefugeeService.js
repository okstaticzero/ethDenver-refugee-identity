//switch web3 type below
//import { web3 } from '../util/web3Util';
import { web3 } from "../util/Uport";
import contract from 'truffle-contract';
import Refugee from '../ethereum/build/contracts/RefugeeIdentity.json';
import { lchmod } from "fs";

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

  async getOnePersonById(_id) {
    console.log("SERVICE", _id);
    const instance = await this.getInstance();
    console.log("INSTANCE");
    const item = await instance.getOnePersonById(_id);
    console.log("RETURNS", item);
    return createUsersObject(item);
  }

  async transferIdentityOwnership(userAddress, _refugeeAddress, _id) {
    const instance = await this.getInstance();
    const item = await instance.transferIdentityOwnership(_refugeeAddress, _id, { from: userAddress });
    return item;
  }

  async getAll() {
    const instance = await this.getInstance();
    const data = await instance.getAll();
    return createUsersObject(data);
  }

}

export default new Refugees();

function createUsersObject(data) {
  let serializeData = [];

  for (let i = 0; i < data[0].length; i++) {
    serializeData.push({
      id: data[0][i],
      name: web3.toAscii(data[1][i]),
      origin: web3.toAscii(data[2][i]),
      oraganization: web3.toAscii(data[3][i]),
      ifps: `${data[4][i]}${data[5][i]}`
    })
  }
  
  return serializeData;
}
