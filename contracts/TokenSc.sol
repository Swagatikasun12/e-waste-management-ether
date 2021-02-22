pragma solidity >=0.4.21 <0.6.0;
contract Token  {
    //string public constant name = "Token4Tranfer";

    //string public constant symbol = "Tok";
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

   // event Transfer(address indexed from, address indexed to, uint tokens);
    uint public _d_id =0;
    uint public _u_id =0;
    uint public _token_id =1;
    uint public _token_id1 =1;
    //uint public _t_id=1;
    //uint public tokenidd=0;
    
      struct Token4Product
       string username;
        uint[] userid;
        address owner1;
        uint[] _data_ids;
        uint[] _token_ids;
    }
 
   mapping(uint => Token4Product) public tokens;
   
    struct Token4Permission 
    {
        //string username;
        uint ownerid;
        uint rcvrid;
        //address owner1;
        uint _data_id;
        //uint _token_ids;
        uint timelimit;
        //uint now;
             
    }
    mapping(uint => Token4Permission) public tokens1;
  // mapping(uint => token1) public tokens1;
 
      function createToken(uint[] memory _data_ids ,uint[] memory _token_ids) public returns (uint)
      {
       /*for(uint u=0;u<userid.length;u++)
       {
        tokens[u].userid.push(userid[u]);
       }*/
        for(uint i=0;i<_data_ids.length;i++)
        {
            tokens[i]._data_ids.push(_data_ids[i]);
        }
        for(uint j=0;j<_token_ids.length;j++)
        {
            tokens[j]._token_ids.push(_token_ids[j]);
        }

        _token_id++;
        return _token_id;
    }
 function createToken1(uint ownerid1, uint rcvrid1, uint _data_ids1 ,uint timelimit1) public returns (uint)
      {
        tokens1[_token_id1].ownerid = ownerid1;
        tokens1[_token_id1].rcvrid = rcvrid1;
        tokens1[_token_id1]._data_id = _data_ids1;
        tokens1[_token_id1].timelimit = timelimit1;
          _token_id1++;
        return _token_id1;
    }
    function getsplit(uint tokenn2_id)public view returns(uint [] memory, uint [] memory)
    {
        return (tokens[tokenn2_id]._data_ids, tokens[tokenn2_id]._token_ids);
    }
    function getsplittoken1(uint tokenn_id)public view returns(uint, uint, uint, uint )
    {
        return (tokens1[tokenn_id].ownerid, tokens1[tokenn_id].rcvrid, tokens1[tokenn_id]._data_id, tokens1[tokenn_id].timelimit);
    }
    }
