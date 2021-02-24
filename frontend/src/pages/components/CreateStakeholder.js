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

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class App extends Component {
    state = {
        account: "0x00",

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

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        let tempRegistrations = await StakeholderRegistration.methods.getTempRegistrations().call();
        console.log("TEMPREG", tempRegistrations);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Create Stakeholder</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Address</TableCell>
                                                <TableCell align="right">Name</TableCell>
                                                <TableCell align="right">ID</TableCell>
                                                <TableCell align="right">Type</TableCell>
                                                <TableCell align="right">Phone</TableCell>
                                                <TableCell align="right">Address</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>
                                                    <TableCell align="right">{row.carbs}</TableCell>
                                                    <TableCell align="right">{row.protein}</TableCell>
                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        );
    }
}

export default App;
