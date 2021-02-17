import React, { Component } from "react";

class App extends Component {
    state = {
        address_add: "",
        address_rem: "",
        message: "",
        color: "red",
    };

    render() {
        return (
            <div>
                <h1>Stakeholder's Console</h1>
            </div>
        );
    }
}

export default App;
