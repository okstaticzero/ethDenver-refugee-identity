import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ripple from "../assets/images/ripple.svg";
import { getAllUsers, createAccount } from "./AccountsActions";
import Loader from "../Loader";
import { web3, account } from "../util/web3Util";
import { showPreloader } from "../app/AppActions";
import "./Accounts.css";
import { Button, Card } from "react-md";
import { initAccount } from "../util/Uport";

export class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = { newAccount: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    this.props.showPreloader(true);
    e.preventDefault();
    let web3 = "uport";
    //let web3 = "standard";
    if (web3 == "standard") {
      console.log("account: ", account);
      this.props.createAccount(
        account,
        { name: "Test Name", avatar: { uri: "" } },
        false
      );
    } else {
      //use uPort
      const indentiy = await initAccount();
      this.props.createAccount(
        indentiy.specificNetworkAddress,
        indentiy.userProfile,
        true
      );
      this.props.showPreloader(false);
    }
  }

  render() {
    return (
      <Card className="Account-main">
        <div className="account-inner">
          <h1>Welcome to RefugeID</h1>
          <p className="home-text">
            This App uses uPort for identity verification and authentication on
            the Blockchain. Download the uPort app on your mobile phone to
            create your identity.
            <a
              href="https://www.uport.me/"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://www.uport.me/
            </a>
          </p>
          <br />
          {this.props.loading ? (
            <Loader />
          ) : (
            <form className="login-form" onSubmit={this.handleSubmit}>
              <div>
                <Button type="submit" raised primary className="custom-button">
                  <p>Log in with uPort</p>
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    );
  }
}

Accounts.propTypes = {
  createAccount: PropTypes.func,
  loading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loading: state.loadingState.loading
  };
}

export default connect(mapStateToProps, {
  getAllUsers,
  createAccount,
  showPreloader
})(Accounts);
