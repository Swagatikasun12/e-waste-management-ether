import React, { Component } from "react";
import web3 from "../web3";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class App extends Component {
    state = {
        warning: true,

        // Form Params
        Name: "",
        ID: "",
        Type: "",
        // Form PrivateInformation
        Address: "",
        Phone: "",
    };

    // handlers
    onRegisterStakeholder = async () => {
        // Functions Body
        // TODO: Add calls to register Stakeholder
        const accounts = await web3.eth.getAccounts();
        const payload = await web3.eth.personal.sign("Hi there!", accounts[0]);
        console.log("ENC", payload);
        const payload0 = await web3.eth.personal.ecRecover("Hi there!", payload);
        console.log("DEC", payload0);
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.warning}
                    autoHideDuration={10000}
                    onClose={(event, reason) => {
                        if (reason === "clickaway") {
                            return;
                        }

                        this.setState({ warning: false });
                    }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={(event, reason) => {
                            if (reason === "clickaway") {
                                return;
                            }

                            this.setState({ warning: false });
                        }}
                        severity="warning"
                    >
                        Oops! You are not registered. Try Registering as a Stakeholder.
                    </MuiAlert>
                </Snackbar>
                <form onSubmit={this.onFindDoctor}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Register as Stakeholder</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    className="inputs"
                                    label="Name"
                                    variant="outlined"
                                    value={this.state.Name}
                                    onChange={(event) =>
                                        this.setState({
                                            Name: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    className="inputs"
                                    label="ID"
                                    variant="outlined"
                                    value={this.state.ID}
                                    onChange={(event) =>
                                        this.setState({
                                            ID: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="filled" style={{ width: 180 }}>
                                    <InputLabel>Stakeholder Type</InputLabel>
                                    <Select
                                        variant="outlined"
                                        label="selected-type"
                                        id="selected-type"
                                        value={this.state.group}
                                        onChange={(event) => {
                                            this.setState({ group: event.target.value });
                                        }}
                                    >
                                        <MenuItem value={"consumer"}>Consumer</MenuItem>
                                        <MenuItem value={"manufactuurer"}>Manufacturer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className="inputs"
                                    label="Phone"
                                    variant="outlined"
                                    value={this.state.Phone}
                                    onChange={(event) =>
                                        this.setState({
                                            Phone: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className="inputs"
                                    label="Address"
                                    variant="outlined"
                                    value={this.state.Address}
                                    onChange={(event) =>
                                        this.setState({
                                            Address: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Button onClick={this.onRegisterStakeholder} color="secondary" variant="contained">
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default App;
