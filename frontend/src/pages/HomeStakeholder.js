import React, { Component } from "react";
import web3 from "../web3";
import StakeholderRegistration from "../contracts/StakeholderRegistration";
import { Link, Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
class App extends Component {
    state = {
        account: "",
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
        stakeholderType: "",
        stakeholderBody: {},
    };

    async componentDidMount() {
        // Set Account Address and Stakeholder Type
        const accounts = await web3.eth.getAccounts();
        let user = await StakeholderRegistration.methods.StakeholderMap(accounts[0]).call();
        this.setState({ accounts: accounts[0], stakeholderBody: user, stakeholderType: this.state.types[user.Type] });
    }

    render() {
        return (
            <div>
                <br />
                <h1>{this.state.stakeholderType}'s Console</h1>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Card variant="outlined" color="primary">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Account Information
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Name : {this.state.stakeholderBody.Name}
                                </Typography>
                                <Typography color="textSecondary">ID: {this.state.stakeholderBody.ID}</Typography>
                                <Typography variant="body2" component="p">
                                    Phone : {this.state.stakeholderBody.Phone}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Address : {this.state.stakeholderBody.Address}
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to={"/purchase"}>
                            <Button color="primary" variant="outlined">
                                Purchase Product
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to={"/"}>
                            <Button color="secondary" variant="outlined">
                                Sell Product
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
