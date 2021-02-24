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
import CircularProgress from "@material-ui/core/CircularProgress";
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

        // Table Params
        rows: [],
        status: "",
    };

    // handlers
    onApproveStakeholder = async () => {
        this.setState({
            status: (
                <Grid item xs={12}>
                    <CircularProgress color="secondary" />
                </Grid>
            ),
        });

        let payload = this.state.rows[0];

        payload.Information = JSON.stringify({ Address: payload.Address, Phone: payload.Phone });

        console.log(payload);

        await StakeholderRegistration.methods
            .createStakeholder(payload.Creator, payload.ID, payload.Name, payload.Information, payload.Type)
            .send({
                from: this.state.account,
            });

        this.loadTable();

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
                        Registration Approval Successful!
                    </MuiAlert>
                </Snackbar>
            ),
        });
    };

    loadTable = async () => {
        this.setState({
            status: (
                <Grid item xs={12}>
                    <CircularProgress color="secondary" />
                </Grid>
            ),
        });

        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        let tempRegistrations = await StakeholderRegistration.methods.getTempRegistrations().call();
        console.log("TEMPREG", tempRegistrations);

        let rows = [];

        for (let a = 0; a < tempRegistrations.length; a++) {
            let regDetails = await StakeholderRegistration.methods.tempRegistrationMap(tempRegistrations[a]).call();
            regDetails = JSON.parse(regDetails.Payload);

            regDetails.Creator = tempRegistrations[a];

            console.log(regDetails);

            rows.push(regDetails);
        }

        this.setState({ rows, status: "" });
    };

    async componentDidMount() {
        await this.loadTable();
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
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Serial</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell align="right">Name</TableCell>
                                                <TableCell align="right">ID</TableCell>
                                                <TableCell align="right">Type</TableCell>
                                                <TableCell align="right">Phone</TableCell>
                                                <TableCell align="right">Address</TableCell>
                                                <TableCell align="right">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.rows.map((row, index) => (
                                                <TableRow key={row.Creator}>
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.Creator}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.Name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.ID}</TableCell>
                                                    <TableCell align="right">{row.Type}</TableCell>
                                                    <TableCell align="right">{row.Phone}</TableCell>
                                                    <TableCell align="right">{row.Address}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                {this.state.status}
                                <Button onClick={this.onApproveStakeholder} color="primary" variant="contained">
                                    Approve Entry 1
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        );
    }
}

export default App;
