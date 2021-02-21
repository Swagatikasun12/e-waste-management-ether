pragma solidity >=0.4.21 <0.6.0;

//import "./RegistrationSc.sol";
//import "./TransferOwnershipSc.sol";
import "./tokenSc.sol";
contract AccessControl 
  {
     //Registration public dc;
     //TransferOwnership public to;
    // address to;
     Token public to;
     constructor(Token addr1) public 
     {
        //dc = addr;
        to = addr1;
     }
        
   // address product_address;
    uint pid;
   
   /* constructor(uint product_id, uint owner_id) public
    {
        //Just create a new auxiliary contract. We will use it to check if the part or product really exist
        //product_address=product_id;
        re = Registration(product_id);
        tr = TransferOwnership(owner_id);
        
    }*/
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
  // uint to;
 // uint r2;
  /* function get_token(uint ownerid,uint rcvrid, uint dataid,uint timelim) public returns (uint)
   {
         uint tokenide = to.createToken1(ownerid,rcvrid,dataid,timelim);
    
    }*/
    /*uint lookup_id;
    function get_tokendetails() public view returns (uint)
    {
        return(lookup_id);
    }
    */
    
    /*constructor () public { 
	    attribute subjectId;
	    subjectId.category = "accesssubject";
		subjectId.id = "Subject";
		subjectId._type = "string";
		
		attribute resourceType;
		resourceType.category = "resource";
		resourceType.id = "Record";
		resourceType._type = "string";
		
		attribute actionId;
		actionId.category = "action";
		actionId.id = "actionId";
		actionId._type = "string";


        attribute conditionId;
		conditionId.category = "condition";
		conditionId.id = "condition";
		conditionId._type = "boolean";

	}

*/
/*	modifier issuetoken(string permissionId, string resourceType, string actionId, string conditionId) {
		require (sha3(resourceType) == sha3("Document"));
		//require(isPermit (msg.sender));
		_;
	}
	modifier _pat(string subjectId, string resourceType, string actionId, string condition) {
		require (sha3(resourceType) == sha3("Medical record") );
		require(isPermit (msg.sender));
		_;
	}
	function permitstakeholders (string subjectId, string resourceType, string actionId, string condition) public issue(subjectId, resourceType, actionId, condition) returns (uint){
		require (sha3(subjectId) == sha3("Issuer") || sha3(subjectId) == sha3("Buyer") && sha3(actionId) == sha3("view") || sha3(actionId) == sha3("download") && sha3(condition) == sha3("emergency"));
	    bool permission = true;
	    perId = 1;
	    string perId;
		
	}
		function permiteditdoctorsnurses (string subjectId, string resourceType, string actionId, string condition) public _patient(subjectId, resourceType, actionId, condition) {
		require (sha3(subjectId) == sha3("doctor") || sha3(subjectId) == sha3("nurse") && sha3(actionId) == sha3("view") && sha3(condition) == sha3("normal"));
	    bool permission = true;
		
	}
		function permitedit (string subjectId, string resourceType, string actionId, string condition) public _pat(subjectId, resourceType, actionId, condition) {
		require (sha3(subjectId) == sha3("doctor") || sha3(subjectId) == sha3("nurse") && sha3(actionId) == sha3("view") && sha3(condition) == sha3("normal"));
	    bool permission = true;
		
	}
    function isPermit (address user) public view returns(bool permission) {
    return true;
}
	function Deny () returns (bool) {
		return false;
	}*/
    
   /* function verifylookups(uint owner_id, uint rcvr_id, uint toknid)
    {
        require (sha3(subjectId) == sha3("doctor")||)
    }*/
   /* function check_lookupId(uint lokupid) public view returns (uint,uint,uint,uint){
        uint d_id;
        uint b_id;
        uint selected_id;
    (d_id,b_id,selected_id,currentlookupId)= dc.verifylookups(currentlookupId);
     return (d_id,b_id,selected_id,currentlookupId);
    }
    */
    
}
