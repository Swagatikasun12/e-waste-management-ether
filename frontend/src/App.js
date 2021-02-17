import React, { Component } from "react";
import web3 from "./web3";
import "./App.css";
import { Route } from "react-router-dom";

class App extends Component {
    state = {
        account: "0x000",
        contractName: "Unknown Hospital",
        userType: 0,
    };

    async componentDidMount() {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
    }

    render() {
        return <div className="App"></div>;
    }
}

export default App;
