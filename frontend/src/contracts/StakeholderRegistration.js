import web3 from "../web3";

const address = "0xc92b90DF7a37186b2d961dE6Df6939C53952fF89";

const abi = require("./ABI/StakeholderRegistration.json");

export default new web3.eth.Contract(abi, address);
