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
import CircularProgress from "@material-ui/core/CircularProgress";

import StakeholderRegistration from "../contracts/StakeholderRegistration";

class App extends Component {
    state = {
        warning: true,
        status: "",
        success: false,

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
        this.setState({
            status: (
                <Grid item xs={12}>
                    <CircularProgress color="secondary" />
                </Grid>
            ),
        });

        const accounts = await web3.eth.getAccounts();

        let payload = JSON.stringify({
            Name: this.state.Name,
            ID: this.state.ID,
            Type: this.state.Type,

            Address: this.state.Address,
            Phone: this.state.Phone,
        });

        await StakeholderRegistration.methods.createTempRegistration(payload).send({
            from: accounts[0],
        });

        this.setState({ success: true });

        this.setState({
            status: (
                <Snackbar
                    open={this.state.success}
                    autoHideDuration={6000}
                    onClose={(event, reason) => {
                        if (reason === "clickaway") {
                            return;
                        }

                        this.setState({ success: false });
                    }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={(event, reason) => {
                            if (reason === "clickaway") {
                                return;
                            }

                            this.setState({ success: false });
                        }}
                        severity="success"
                    >
                        Registration Request Successful!
                    </MuiAlert>
                </Snackbar>
            ),
        });
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
                    <br />
                    <br />
                    <Grid container spacing={1}>
                        {this.state.status}
                    </Grid>
                </form>
            </div>
        );
    }
}

export default App;
