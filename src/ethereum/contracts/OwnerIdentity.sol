pragma solidity ^0.4.19;

contract OwnerIdentity {
    
  function OwnerIdentity() public {
        _owner = msg.sender;
        admins[msg.sender] = true;
  }
   
    address _owner;
    
    mapping(address => bool) internal admins;
    
    modifier _adminOnly() {
        require(admins[msg.sender]);
        _;
    }
    
    modifier _ceoApprove() {
        require(msg.sender == _owner);
        _;
    }
    
    function addAdmin(address _address) _ceoApprove() public {
        admins[_address] = true;
    }

    function isAdmin() public view returns(bool) {
        return admins[msg.sender];
    }

    
}
