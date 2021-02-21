pragma solidity >=0.4.21 <0.6.0;
contract Token  {
    uint public _d_id =0;
    uint public _u_id =0;
    uint public _token_id =1;
    uint public _t_id=1;
    uint public tokenidd=0;
    
    struct token1 
    {
        //string username;
        uint ownerid;
        uint rcvrid;
        //address owner1;
        uint _data_ids;
        //uint _token_ids;
        uint timelimit;
        //uint now;
             
    }
    mapping(uint => token1) public tokens1;
 
      function createToken(uint[] userid, uint[] _data_ids ,uint[] _token_ids) public returns (uint)
      {
       for(uint u=0;u<userid.length;u++)
       {
        tokens[u].userid.push(userid[u]);
       }
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
        tokens1[_token_id1]._data_ids = _data_ids1;
        tokens1[_token_id1].timelimit = timelimit1;
          _token_id1++;
        return _token_id1;
    }
    function getsplit(uint token2_id)public view returns(uint [], uint [])
    {
        return (tokens[token2_id]._data_ids, tokens[token2_id]._token_ids);
    }
    }
