pragma solidity >=0.4.21 <0.6.0;
//import "./RegistrationSc.sol";
import "./tokenSc.sol";

contract TransferOwnership is Token {
    // StakeholderRegistration public r1;
    Token public r2;

    constructor(Token addr1) public {
        //r1 = addr;
        r2 = addr1;
    }

    string ciphertext;
    string data_id;
    struct track_data {
        uint256 _previous_owner_id;
        string _previous_owner_name;
        uint256 _data_id;
        uint256 _token_id;
        uint256 _owner_id;
        string _owner_name;
        uint256 _timeStamp;
        string _owner_type;
    }
    mapping(uint256 => track_data) public tracks;
    struct product {
        string _product_name;
        uint256 _product_cost;
        string _product_specs;
        string _data_hash;
        uint256 _owner_id;
        uint256 _manufacture_date;
        address _products_owner_address;
        uint256[] _owner_ids;
        uint256[] trace_ids;
    }

    mapping(uint256 => product) public products;
    struct User {
        string _userName;
        string _passWord;
        address _address;
        string _userType;
    }
    mapping(uint256 => User) public Users;

    function transfer(
        uint256 user1,
        uint256 user2,
        uint256[] memory productid,
        uint256[] memory tokenid
    ) public returns (uint256, uint256) {
        uint256 tokenidew = r2.createToken(productid, tokenid, user1);
        uint256 transfer_id;
        uint256 token1_id = 1;
        uint256 i = 1;
        User memory p1 = Users[user1];
        User memory p2 = Users[user2];
        if (
            (keccak256(abi.encode(p1._userType)) ==
                keccak256(abi.encode("Owner")) &&
                keccak256(abi.encode(p2._userType)) ==
                keccak256(abi.encode("CurrentOwner"))) ||
            (keccak256(abi.encode(p1._userType)) ==
                keccak256(abi.encode("CurrentOwner")) &&
                keccak256(abi.encode(p2._userType)) ==
                keccak256(abi.encode("CurrentOwner")))
        ) {
            //tracks[transfer_id]._data_id =data_id[i];
            tracks[transfer_id]._token_id = tokenidew;
            tracks[transfer_id]._owner_id = user2;
            //tracks[transfer_id]._owner_name=Users[user2_id]._userName;
            tracks[transfer_id]._timeStamp = now;
            tracks[transfer_id]._previous_owner_id = user1;
            //tracks[transfer_id]._previous_owner_name=Users[user1_id[i]]._userName;
            products[productid[i]]._owner_id = user2;
            products[productid[i]].trace_ids.push(transfer_id);
            products[productid[i]]._owner_ids.push(user2);
            transfer_id++;
            token1_id = token1_id + 1;
            return (transfer_id, token1_id);
        } else {
            return (0, 0);
        }
    }

    function getdata_tracking_ids(uint256 data_id)
        public
        returns (uint256[] memory)
    {
        //product memory p = products[p_id];
        return products[data_id].trace_ids;
    }

    function getdata_trackindes(uint256 t_id)
        public
        returns (
            uint256,
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        return (
            tracks[t_id]._previous_owner_id,
            tracks[t_id]._previous_owner_name,
            tracks[t_id]._owner_id,
            tracks[t_id]._owner_name,
            tracks[t_id]._timeStamp
        );
    }

    function get_datahash(uint256 did) public returns (string memory) {
        products[did]._data_hash;
    }

    function getDataCipher() public view returns (string memory) {
        return ciphertext;
    }

    function setCypherData(string memory mciphertext) public {
        ciphertext = mciphertext;
    }
}
