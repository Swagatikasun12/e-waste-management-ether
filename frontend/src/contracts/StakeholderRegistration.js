import web3 from "../web3";

const address = process.env.CONTRACT_STAKEHOLDER_REGISTRATION;

const abi = require("./ABI/StakeholderRegistration.json");

export default new web3.eth.Contract(abi, address);
