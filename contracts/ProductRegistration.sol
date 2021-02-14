pragma solidity ^0.5.13;

import "./StakeholderRegistration.sol"

contract ProductRegistration {
    address public Admin; // Address of Creator & Administrator of the contract
    mapping(bytes16 => product) public productMap; // Mapping to store (Product's Address) => (Products's Details)
    StakeholderRegistration public StakeholderSC;

    // Structure to store details of a Product
    struct product {
        address Creator; // Address of Creator
        bytes16 ID; // ID of Product
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
            StakeholderSC.Stakeholders[msg.sender],
            "Sender NOT Stakeholder."
        ); // Check if Sender is Stakeholder
        _;
    }

    // Constructor to create the Contract
    constructor(address _StakeholderSC) public {
        Admin = msg.sender; // Setting the Admin
        tempRegistrations = new address[](0); // Init. of address[] tempRegistrations List
        Registrations = new address[](0); // Init. of address[] products List
        StakeholderSC = StakeholderRegistration(_StakeholderSC);
    }

    // Function to Create new Product
    function createProduct(
        address _Creator,
        bytes16 memory _ID,
        string memory _Name,
        string memory _PrivateInformation,
        uint256 _Type
    ) public onlyStakeholder {
        product memory newProduct =
            product({
                Creator: _Creator,
                ID: _ID,
                Name: _Name,
                PrivateInformation: _PrivateInformation,
                Type: _Type
            });
        Products[_Account] = true; // Add Product's Address to Products mapping
        productMap[_Account] = newProduct; // Add new Product to productMap
    }

    // Function to Read Product
    function readProduct(bytes16 _ID) public view returns (product) {
        return productMap[_ID];
    }

    // Function to Update a Product
    function updateProduct(bytes16 _ID, string memory _Name, string memory _PrivateInformation)
        public
        onlyStakeholder
    {
        require(Products[_ID].Creator == msg.sender, "Tx Sender NOT Owner!");
        productMap[msg.sender].Name = _Name;
        productMap[msg.sender].PrivateInformation = _PrivateInformation;
    }

    // ----------------
    // Helper Functions
    // ----------------

    // Function to Remove tempRegistration from array and mapping
    function removeTempRegistration(address _target) {
        uint8 index = 0;

        // Determine Index of the target
        for (uint8 i = 0; i < tempRegistrations.length; i++) {
            if (tempRegistrations[i] == _target) {
                index = i;
            }
        }

        // Remove target from tempRegistrations
        if (index >= tempRegistrations.length) return;
        for (uint8 i = index; i < tempRegistrations.length - 1; i++) {
            tempRegistrations[i] = tempRegistrations[i + 1];
        }
        tempRegistrations.length--;

        delete tempRegistrationMap[_target];
    }

    // Function to self-destruct ONLY FOR TESTING
    function kill() public onlyAdmin {
        prescriptionVault.kill();
        selfdestruct(address(uint160(Admin)));
    }
}
