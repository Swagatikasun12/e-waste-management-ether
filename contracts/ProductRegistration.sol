pragma solidity ^0.5.13;

import "./StakeholderRegistration.sol";

contract ProductRegistration {
    address public Admin; // Address of Creator & Administrator of the contract
    mapping(string => product) public productMap; // Mapping to store (Product's Address) => (Products's Details)
    StakeholderRegistration public StakeholderSC;

    // Structure to store details of a Product
    struct product {
        address Creator; // Address of Creator
        string ID; // ID of Product
        string Name; // Name of Product
        string PrivateInformation; // Encrypted Information of Product
        string Type; // Type of Product
    }

    modifier onlyAdmin() {
        require(msg.sender == Admin, "Sender NOT Admin."); // Check if Sender is Admin
        _;
    }

    modifier onlyStakeholder() {
        require(
            StakeholderSC.Stakeholders(msg.sender),
            "Sender NOT Stakeholder."
        ); // Check if Sender is Stakeholder
        _;
    }

    // Constructor to create the Contract
    constructor(address _StakeholderSC) public {
        Admin = msg.sender; // Setting the Admin
        StakeholderSC = StakeholderRegistration(_StakeholderSC);
    }

    // Function to Create new Product
    function createProduct(
        string memory _ID,
        string memory _Name,
        string memory _PrivateInformation,
        string memory _Type
    ) public onlyStakeholder {
        product memory newProduct =
            product({
                Creator: msg.sender,
                ID: _ID,
                Name: _Name,
                PrivateInformation: _PrivateInformation,
                Type: _Type
            });
        productMap[_ID] = newProduct; // Add new Product to productMap
    }

    // Function to Update a Product
    function updateProduct(
        string memory _ID,
        string memory _Name,
        string memory _PrivateInformation
    ) public onlyStakeholder {
        require(productMap[_ID].Creator == msg.sender, "Tx Sender NOT Owner!");
        productMap[_ID].Name = _Name;
        productMap[_ID].PrivateInformation = _PrivateInformation;
    }

    // ----------------
    // Helper Functions
    // ----------------

    // Function to self-destruct ONLY FOR TESTING
    function kill() public onlyAdmin {
        selfdestruct(address(uint160(Admin)));
    }
}
