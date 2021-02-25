import React, { Component } from "react";
import web3 from "../../web3";
import StakeholderRegistration from "../../contracts/StakeholderRegistration";

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
        account: "0x0",
        stakeholderBody: {},
        stakeholderType: 0,
        suppliers: [],
        types: [
            "Manufacturer",
            "Wholesaler",
            "Retailer",
            "Consumer",
            "Collector",
            "Segregator",
            "Recycler",
            "Raw Material Supplier",
        ],

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

    getSuppliers = async () => {
        let suppliersAddress = await StakeholderRegistration.methods
            .getStakeholdersOfType(this.state.stakeholderType == 0 ? 7 : this.state.stakeholderType - 1)
            .call();
        console.log(suppliersAddress);
        let suppliers = [];
        for (let a = 0; a < suppliersAddress.length; a++) {
            let supplier = await StakeholderRegistration.methods.StakeholderMap(suppliersAddress[a]).call();
            suppliers.push({ Name: supplier.Name, Account: supplier.Account });
        }
        console.log(suppliers);
        let suppliersSelect = (
            <Select
                variant="outlined"
                label="selected-type"
                id="selected-type"
                value={this.state.supplier}
                onChange={(event) => {
                    this.setState({ supplier: event.target.value });
                }}
            >
                {suppliers.map((row, index) => (
                    <MenuItem key={index} value={row.Account}>
                        {row.Name}
                    </MenuItem>
                ))}
            </Select>
        );
        this.setState({ suppliers: suppliersSelect });
    };

    async componentDidMount() {
        // Get Account Information and Get Suppliers
        const accounts = await web3.eth.getAccounts();
        let user = await StakeholderRegistration.methods.StakeholderMap(accounts[0]).call();
        this.setState({ accounts: accounts[0], stakeholderBody: user, stakeholderType: user.Type });
        await this.getSuppliers();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <br />
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
