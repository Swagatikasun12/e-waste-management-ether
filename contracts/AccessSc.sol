pragma solidity >=0.4.21 <0.6.0;

//import "./RegistrationSc.sol";
//import "./TransferOwnershipSc.sol";
import "./tokenSc.sol";
contract AccessControl 
  {
      event Transfer(address indexed from, address indexed to, uint256 tok);
      event Approval(address indexed access, address indexed req, uint256 tok);
      mapping(address => mapping (address => uint256)) allowed;
     
     Token public to;
     constructor(Token addr1) public 
     {
        //dc = addr;
        to = addr1;
     }
        
   // address product_address;
    uint pid;
   
   
   struct lookup{
       /* uint b_id;
        uint p_id;
        uint o_id;
        uint timelimit;
        string toknid;
        //string smartcontract_name;
        uint product_id;
       // bytes32 interactionId;
        uint _timeStamp;
        //uint flag;*/
        string permission;
        uint key;
        uint dataid;
        uint o_id;
        uint rcvr_id;
        uint timelim;
        }
       
    mapping(uint => lookup) public lookups;
     
    //string reencryptedmsg;
    //string empheralencryptedkey;
   function enter_lookup(string memory permission, uint key, uint dataid, uint o_id, uint rcvr_id, uint timelim) public returns (uint)
   {   
       uint k;
       lookups[k].permission = permission;
       lookups[k].key = key;
       lookups[k].dataid = dataid;
       lookups[k].o_id = o_id;
       lookups[k].rcvr_id = rcvr_id;
       lookups[k].timelim = timelim;
        k++;
        return k; 
        uint tokenide = to.createToken1(o_id,rcvr_id,dataid,timelim);
        return tokenide;
   }
   
    function approve(address delegate, uint256 Tokens) public  returns (bool) {

        allowed[msg.sender][delegate] = Tokens;

        emit Approval(msg.sender, delegate, Tokens);

        return true;

    }

    /*function allowance(address owner, address reqestor) public  view returns (uint) {

        return allowed[owner][reqestor];

    }*/

    function transferFrom(address accesssc, address buyer, uint256 Tokens) public  returns (bool) {

        

        

        

        emit Transfer(accesssc, buyer, Tokens);

        return true;

    }



    
}
