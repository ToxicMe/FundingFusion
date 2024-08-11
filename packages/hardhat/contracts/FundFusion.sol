// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 0x6ef2AF5E633096e03517c15f36Cd6f0b871953Bd
//0x81ca3f902B8Ddf3B45Ed06D1ADe5C1fAF9728E45

contract FundFusion {
    uint public totalApplications;
    uint public totalAdministrators;
    uint public totalGrants;
    uint public totalPayments;
    uint public totalAmountPaid;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Administrator {
        uint id;
        string name;
        address addr;
    }

    struct GrantApplication {
        uint grantId;
        uint id;
        string projectTitle;
        string description;
        string problemStatement;
        
        string demoVideoLink;
        string liveLink;
        string sourceCode;
        uint timestamp;
        string ipfsHash;
        address applicant;
        bool approved;
        
    }

    struct Grant {
        uint id;
        string name;
        string description;
        uint deadline;
        uint amount;
        address owner;
        
    }

    struct Payment {
        uint id;
        uint applicationId;
        address applicant;
        uint amount;
        uint timestamp;
    }

    Administrator[] public administrators;
    Grant[] public grants;
    GrantApplication[] public grantApplications;
    Payment[] public payments;

    event AdministratorAdded(uint id, string name, address addr);
    event GrantAdded(uint id, string name, string description, uint deadline, uint amount, address owner);
    event GrantApplicationAdded(uint id, address applicant);
    event GrantApplicationApproved(uint id, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAdministrator() {
        require(isAdministrator(msg.sender), "Only administrators can call this function");
        _;
    }

    function addAdministrator(string memory name) public  {
        administrators.push(Administrator({
            id: totalAdministrators,
            name: name,
            addr: msg.sender
        }));
        totalAdministrators++;
        emit AdministratorAdded(totalAdministrators - 1, name, msg.sender);
    }

    function addGrant(string memory name, string memory description, uint deadline, uint amount) public onlyAdministrator {
        require(deadline > block.timestamp, "Deadline must be in the future");
        grants.push(Grant({
            id: totalGrants,
            name: name,
            description: description,
            deadline: deadline,
            amount: amount,
            owner : msg.sender
        }));
        totalGrants++;
        emit GrantAdded(totalGrants - 1, name, description, deadline, amount, msg.sender);
    }

    //function to get all grants
    function getGrants() public view returns (Grant[] memory) {
        return grants;
    }

    //function to get grant application from id
    function getGrantApplication(uint id) public view returns (GrantApplication memory){
        return grantApplications[id];
    }

    //function to get grant from id
    function getGrant(uint id) public view returns (Grant memory) {
        return grants[id];
    }

    //function to get all grant applications from address
    function getGrantApplications() public view returns (GrantApplication[] memory) {
        return grantApplications;
    }

    //function to get all approved grant applications
    function getApprovedGrantApplications() public view returns (GrantApplication[] memory) {
        uint approvedCount = 0;
        //  counting approved applications
        for (uint i = 0; i < grantApplications.length; i++) {
            if (grantApplications[i].approved == true) {
                approvedCount++;
            }
        }
        //array to hold the approved applications
        GrantApplication[] memory approvedApplications = new GrantApplication[](approvedCount);
        uint index = 0;

        //populating the approved applications array
        for (uint i = 0; i < grantApplications.length; i++) {
            if (grantApplications[i].approved == true) {
                approvedApplications[index] = grantApplications[i];
                index++;
            }
        }
        return approvedApplications;
    }


    function makeGrantApplication(
        uint grantId,
        string memory projectTitle,
        string memory description,
        string memory problemStatement,     
        string memory demoVideoLink,
        string memory liveLink,
        string memory sourceCode,
        string memory ipfsHash
    ) public {
        grantApplications.push(GrantApplication({
            grantId: grantId,
            id: totalApplications,
            projectTitle: projectTitle,
            description: description,
            problemStatement: problemStatement,          
            demoVideoLink: demoVideoLink,
            liveLink: liveLink,
            sourceCode: sourceCode,
            timestamp: block.timestamp,
            ipfsHash: ipfsHash,
            applicant: msg.sender,
            approved: false
        }));
        totalApplications++;
        emit GrantApplicationAdded(totalApplications - 1, msg.sender);
    }

    function approveGrantApplication(uint id, uint amount) public onlyAdministrator {
        require(id < totalApplications, "Invalid application ID");
        require(grantApplications[id].approved == false, "Application already approved");
        grantApplications[id].approved = true;
        payments.push(Payment({
            id: totalPayments,
            applicationId: id,
            applicant: grantApplications[id].applicant,
            amount: amount,
            timestamp: block.timestamp
        }));
        totalPayments++;
        totalAmountPaid += amount;
        emit GrantApplicationApproved(id, amount);
    }

    //function to get all payments
    function getPayments() public view returns (Payment[] memory) {
        return payments;
    }

    //function to get payment from id
    function getPayment(uint id) public view returns (Payment memory) {
        return payments[id];
    }

    //function to get total amount paid
    function getTotalAmountPaid() public view returns (uint) {
        return totalAmountPaid;
    }

    function isAdministrator(address addr) public view returns (bool) {
        for (uint i = 0; i < administrators.length; i++) {
            if (administrators[i].addr == addr) {
                return true;
            }
        }
        return false;
    }
}
