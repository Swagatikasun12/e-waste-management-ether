pragma solidity >=0.4.21 <0.6.0;
contract Token  
{
    
    uint public _d_id =0;
    uint public _u_id =0;
    uint public _token_id =1;
    uint public _token_id1 =1;
    //uint public _t_id=1;
    //uint public tokenidd=0;
    
      struct token1 
    {
       // string username;
        //uint[] userid;
        uint ownerid;
        uint[] _product_ids;
        uint[] _token_ids;
    }
 
   mapping(uint => token1) public tokens;
   
    struct token2 
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
    mapping(uint => token2) public tokens1;
  // mapping(uint => token1) public tokens1;
 
      function createToken(uint[] memory _product_ids ,uint[] memory _token_ids, uint ownerid) public returns (uint)
      {
       /*for(uint u=0;u<userids.length;u++)
       {
        tokens[u].userid.push(userids[u]);
       }*/
        for(uint i=0;i<_product_ids.length;i++)
        {
            tokens[i]._product_ids.push(_product_ids[i]);
        }
        for(uint j=0;j<_token_ids.length;j++)
        {
            tokens[j]._token_ids.push(_token_ids[j]);
        }
        uint _toke_id=0;
     tokens[_toke_id].ownerid = ownerid;
     _toke_id++;
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
        return (tokens[tokenn2_id]._product_ids, tokens[tokenn2_id]._token_ids);
    }
    function getsplittoken1(uint tokenn_id)public view returns(uint, uint, uint, uint )
    {
        return (tokens1[tokenn_id].ownerid, tokens1[tokenn_id].rcvrid, tokens1[tokenn_id]._data_id, tokens1[tokenn_id].timelimit);
    }
    }
