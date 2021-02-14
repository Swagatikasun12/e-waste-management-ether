pragma solidity ^0.5.13;

contract StakeholderRegistration {
    address public Issuer; // Address of Ceator & Administrator of the contract
    address[] TempRegistrations; // List of Temporary Registrations
    mapping(address => bool) public Stakeholders; // Mapping for Stakeholders
    mapping(address => tempRegistartion) public tempRegistrationMap; // Mapping to store Temporary Registrations (Stakeholder's address) => (tempRegistration)
    mapping(address => stakeholder) public stakeholderMap; // Mapping to store (Stakeholder's Address) => (Stakeholders's Details)

    // Structure to store details of temporary registration
    struct tempRegistration {
        string Payload; // Registration Payload
        address Creator; // Tx Sender Address
    }

    // Structure to store details of a Stakeholder
    struct stakeholder {
        address Account; // Address of Stakeholder
        string ID; // ID of Stakeholder
        string Name; // Name of Stakeholder
        string Information; // Encrypted Information of Stakeholder
        string Type; // Type of Stakeholder
    }

    modifier onlyIssuer() {
        require(msg.sender == Issuer, "Sender NOT Issuer."); // Check if Sender is Issuer
        _;
    }

    modifier onlyStakeholder() {
        require(Stakeholders[msg.sender], "Sender NOT Stakeholder."); // Check if Sender is Stakeholder
        _;
    }

    // Constructor to create the Contract
    constructor() public {
        Issuer = msg.sender; // Setting the Issuer
        tempRegistrations = new address[](0); // Init. of address[] tempRegistrations List
        Registrations = new address[](0); // Init. of address[] stakeholders List
    }

    // Function to Create new tempRegistration
    function createTempRegistration(string memory _Payload) public {
        tempRegistration memory newTempRegistration =
            tempRegistration({Payload: _Payload, Creator: msg.sender});
        TempRegistrations.push(_id); // Push TempRegistration ID to tempRegistration List
        tempRegistrationMap[_id] = newTempRegistration; // Add newTempRegistration to tempRegistration
    }

    // Function to Create new Stakeholder
    function createStakeholder(
        address _Account,
        string memory _ID,
        string memory _Name,
        string memory _Information,
        uint256 _Type
    ) public onlyIssuer {
        stakeholder memory newStakeholder =
            stakeholder({
                Account: _Account,
                ID: _ID,
                Name: _Name,
                Information: _Information,
                Type: _Type
            });
        Stakeholders[_Account] = true; // Add Stakeholder's Address to Stakeholders mapping
        stakeholderMap[_Account] = newStakeholder; // Add new Stakeholder to stakeholderMap
        removeTempRegistration(_Account); // Remove Temporary Registration
    }

    // Function to Read Temporary Registration
    function readTempRegistration(address _Address)
        public
        view
        returns (tempRegistration)
    {
        return tempRegistrationMap[_Address];
    }

    // Function to Read Stakeholder
    function readStakeholder(address _Address)
        public
        view
        returns (stakeholder)
    {
        return stakeholderMap[_Address];
    }

    // Function to Update a Stakeholder
    function updateStakeholder(string memory _Name, string memory _Information)
        public
        onlyStakeholder
    {
        require(Stakeholders[msg.sender], "Stakeholder Doesn't Exist!");
        stakeholderMap[msg.sender].Name = _Name;
        stakeholderMap[msg.sender].Information = _Information;
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
    function kill() public onlyIssuer {
        prescriptionVault.kill();
        selfdestruct(address(uint160(Issuer)));
    }
}
