import React, { Component } from "react";
import web3 from "../../web3";

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
        suppliers: "",

        // Form Params
        Qty: 0,
        Name: "",
        Type: "",
        // Form PrivateInformation
        Supplier: "",
    };

    // handlers
    onSubmitForm = async () => {
        // Functions Body
        // TODO: Add calls to register Stakeholder
        // const accounts = await web3.eth.getAccounts();
        // const payload = await web3.eth.personal.sign("Hi there!", accounts[0]);
        // console.log("ENC", payload);
        // const payload0 = await web3.eth.personal.ecRecover("Hi there!", payload);
        // console.log("DEC", payload0);
    };

    componentDidMount() {
        let suppliers = (
            <Select
                variant="outlined"
                label="selected-type"
                id="selected-type"
                value={this.state.supplier}
                onChange={(event) => {
                    this.setState({ supplier: event.target.value });
                }}
            >
                <MenuItem value={"consumer"}>Consumer</MenuItem>
                <MenuItem value={"manufactuurer"}>Manufacturer</MenuItem>
            </Select>
        );
        this.setState({ suppliers: suppliers });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Purchase Product</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    className="inputs"
                                    label="Product Name"
                                    variant="outlined"
                                    value={this.state.Name}
                                    onChange={(event) =>
                                        this.setState({
                                            Name: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    className="inputs"
                                    label="Quantity"
                                    type="number"
                                    variant="outlined"
                                    value={this.state.Qty}
                                    onChange={(event) =>
                                        this.setState({
                                            Qty: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="filled" style={{ width: 180 }}>
                                    <InputLabel>Supplier</InputLabel>
                                    {this.state.suppliers}
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    className="inputs"
                                    label="Product Type"
                                    variant="outlined"
                                    value={this.state.Type}
                                    onChange={(event) =>
                                        this.setState({
                                            Type: event.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Button onClick={this.onSubmitForm} color="secondary" variant="contained">
                        Purchase
                    </Button>
                </form>
            </div>
        );
    }
}

export default App;
