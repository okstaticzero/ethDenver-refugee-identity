pragma solidity ^0.4.19;

import "./OwnerIdentity.sol";

contract RefugeeIdentity is OwnerIdentity {
   
   uint counter = 0;
   
   struct Person {
       uint id;
       bytes32 fullName;
       bytes32 origin;
       bytes32 organization;
       bytes32 ipfsFirst;
       bytes32 ipfsSecond;
   }
   
   struct PersonWithUport {
       uint id;
       bool exists;
   }
   
    mapping(uint => Person) people;
    
    mapping(address => PersonWithUport) peopleWithUport;
    
    modifier _ownerDoenstExist(address _address)  {
        require(!peopleWithUport[_address].exists);
        _;
    }
    
    function addPerson(bytes32 _fullName, bytes32 _origin, bytes32 _organization, bytes32 _ipfs1, bytes32 _ipfs2) public _adminOnly() payable {
        people[counter] = Person(counter, _fullName, _origin, _organization, _ipfs1, _ipfs2);
        counter++;
    }
    
     function editPerson(uint _id, bytes32 _fullName, bytes32 _origin, bytes32 _organization, bytes32 _ipfs1, bytes32 _ipfs2) public  payable {
        require(peopleWithUport[msg.sender].exists || admins[msg.sender]);
        people[_id] = Person(_id, _fullName, _origin, _organization, _ipfs1, _ipfs2);
    }
    
    function getOnePersonById(uint _id) public view returns(uint, bytes32, bytes32, bytes32, bytes32, bytes32) {
        Person memory currentPerson = people[_id]; 
        return (currentPerson.id, currentPerson.fullName, currentPerson.origin, currentPerson.organization, currentPerson.ipfsFirst, currentPerson.ipfsSecond);
    }
    
    function getAll() public view returns(uint[], bytes32[], bytes32[], bytes32[], bytes32[], bytes32[]) {
        uint[] memory ids = new uint[](counter);
        bytes32[] memory names = new bytes32[](counter);
        bytes32[] memory origins = new bytes32[](counter);
        bytes32[] memory organizations = new bytes32[](counter);
        bytes32[] memory ipfsOne = new bytes32[](counter);
        bytes32[] memory ipfsTwo = new bytes32[](counter);
        
        for (uint i = 0; i < counter; i++) {
            ids[i] = people[i].id;
            names[i] = people[i].fullName;
            origins[i] = people[i].origin;
            organizations[i] = people[i].organization;
            ipfsOne[i] = people[i].ipfsFirst;
            ipfsTwo[i] = people[i].ipfsSecond;
        }
        
        return (ids, names, origins, organizations, ipfsOne, ipfsTwo);
    }
    
    function transferIdentityOwnership(address _address, uint _id) public payable _adminOnly() _ownerDoenstExist(_address) returns(bool) {
      peopleWithUport[_address] = PersonWithUport(_id, true);
    }
    
}
