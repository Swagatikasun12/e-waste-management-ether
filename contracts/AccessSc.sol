pragma solidity >=0.4.21 <0.6.0;

import "./RegistrationSc.sol";
import "./TransferOwnershipSc.sol";
contract AccessControl is Registration,TransferOwnership
  {
     Registration public dc;
     TransferOwnership public to;
     
     constructor(Registration addr,Token addr1) public 
     {
        dc = addr;
        to = addr1;
     }
        
   // address product_address;
    uint pid;
    struct details
    {
        uint _product_id;
        uint _owner_id;
        //string _owner_name;
        string _owner_type;
    }
    constructor(uint product_id, uint owner_id) public
    {
        //Just create a new auxiliary contract. We will use it to check if the part or product really exist
        //product_address=product_id;
        re = Registration(product_id);
        tr = TransferOwnership(owner_id);
        
    }
   struct lookup{
        uint b_id;
        uint p_id;
        uint o_id;
        uint timelimit;
        //string smartcontract_name;
        uint product_id;
       // bytes32 interactionId;
        uint _timeStamp;
        //uint flag;
        }
       
    mapping(uint => lookup) public lookups;
     
    //string reencryptedmsg;
    //string empheralencryptedkey;
   
   uint to;
   function get_token(uint buyerid,uint dataid,uint selectedownerid) public returns (uint)
   {
         return to;
    
    }
    
    function get_tokendetails() public view returns (uint)
    {
        return(lookup_id);
    }
    function check_lookupId(uint tokenid) public view returns (uint,uint,uint,uint){
        uint d_id;
        uint b_id;
        uint selected_id;
    (d_id,b_id,selected_id,currentlookupId)= dc.verifylookups(currentlookupId);
     return (d_id,b_id,selected_id,currentlookupId);
    }
    
}
