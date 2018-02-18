import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPerson } from "./AddNewActions";

import "./AddNew.css";
import {
  Button,
  Card,
  TextField,
  Cell,
  Grid,
  FileInput,
  CardTitle
} from "react-md";

const ipfsAPI = require("ipfs-api");

export class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.viewUser.name || "",
      gender: this.props.viewUser.gender || "",
      origin: this.props.viewUser.origin || "",
      organization: this.props.viewUser.organization || "",
      phonenumber: this.props.viewUser.phonenumber || "",
      birthday: this.props.viewUser.birthday || "",
      currentLocation: this.props.viewUser.currentLocation || "",
      email: this.props.viewUser.email || "",
      file_arr: this.props.viewUser.file_arr || []
    };
    this.ipfsApi = ipfsAPI({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https"
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
    this.arrayBufferToString = this.arrayBufferToString.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.viewUser);
  }

  captureFile(files, event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader, file.name);
    reader.readAsArrayBuffer(file);
  }

  saveToIpfs(reader, file) {
    let ipfsId;
    const buffer = Buffer.from(reader.result);
    this.ipfsApi
      .add(buffer, { progress: prog => console.log(`received: ${prog}`) })
      .then(response => {
        ipfsId = response[0].hash;
        console.log(ipfsId);
        const ipfUrl = "https://ipfs.io/ipfs/" + ipfsId;
        this.setState({
          file_arr: [...this.state.file_arr, { ipfUrl: ipfUrl, file: file }]
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  arrayBufferToString(arrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer));
  }

  handleFileSubmit(event) {
    event.preventDefault();
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = this.state;
    this.props.addPerson(data);
  }

  render() {
    return (
      <div className="addnew-wrapper">
        <Grid>
          <Cell size={9}>
            <Card className="card-left">
              <CardTitle
                className="add-new-refugee-title"
                title={this.props.title || this.props.viewUser.name } />
              <form
                id="add-employee-form"
                onSubmit={this.handleSubmit}
                className="md-text-container add-employee-form"
              >
                <Grid className="grid-example">
                  <Cell size={6}>
                    <TextField
                      id="name"
                      tabIndex={1}
                      name="name"
                      type="text"
                      label="Name"
                      onChange={name => this.setState({ name })}
                      value={this.state.name}
                      required
                      className="md-cell md-cell--12"
                      disabled={this.props.disabelForm}
                    />

                    <TextField
                      id="gender"
                      tabIndex={3}
                      label="Gender"
                      onChange={gender => this.setState({ gender })}
                      placeholder=""
                      type="text"
                      value={this.state.gender}
                      className="md-cell md-cell--12"
                      required
                      disabled={this.props.disabelForm}
                    />
                    <TextField
                      id="origin"
                      tabIndex={3}
                      label="Orgin Location"
                      onChange={origin => this.setState({ origin })}
                      placeholder=""
                      type="text"
                      value={this.state.origin}
                      className="md-cell md-cell--12"
                      required
                      disabled={this.props.disabelForm}
                    />
                    <TextField
                      id="phonenumber"
                      tabIndex={3}
                      label="Phone Number"
                      onChange={phonenumber => this.setState({ phonenumber })}
                      placeholder=""
                      type="text"
                      value={this.state.phonenumber}
                      className="md-cell md-cell--12"
                      required
                      disabled={this.props.disabelForm}
                    />
                  </Cell>
                  <Cell size={6}>
                    <TextField
                      id="birthday"
                      tabIndex={3}
                      label="Birthday"
                      onChange={birthday => this.setState({ birthday })}
                      placeholder=""
                      type="text"
                      value={this.state.birthday}
                      className="md-cell md-cell--12"
                      required
                      disabled={this.props.disabelForm}
                    />
                    <TextField
                      id="organization"
                      tabIndex={3}
                      label="Oranization"
                      onChange={organization => this.setState({ organization })}
                      placeholder=""
                      type="text"
                      value={this.state.organization}
                      className="md-cell md-cell--12"
                      required
                      disabled={this.props.disabelForm}
                    />
                    <TextField
                      id="currentLocation"
                      tabIndex={3}
                      label="Current Location"
                      onChange={currentLocation =>
                        this.setState({ currentLocation })
                      }
                      placeholder=""
                      type="text"
                      value={this.state.currentLocation}
                      className="md-cell md-cell--12"
                      required
                      disabled={this.props.disabelForm}
                    />
                    <TextField
                      id="email"
                      tabIndex={3}
                      label="Email Address"
                      onChange={email => this.setState({ email })}
                      placeholder="you@example.com"
                      type="text"
                      value={this.state.email}
                      className="md-cell md-cell--12"
                      errorText="Email is required."
                      required
                      disabled={this.props.disabelForm}
                    />
                  </Cell>
                </Grid>

                {
                  !this.props.disabelForm ? <Button
                  raised
                  primary
                  className="custom-button addnew-btn"
                  id="submit"
                  disabled={ this.props.disabelForm }
                  type="submit"
                >
                  <p>Add to database</p>
                </Button> : 
                  <Button
                      raised
                      primary
                      className="custom-button addnew-btn"
                      id="transferIdentity"
                      type="submit" >
                    <p>Transfer Identity</p>
                  </Button>
               }
              </form>
            </Card>
          </Cell>
          <Cell size={3}>
            <Card className="card-right">
              <div>
                {this.state.file_arr.map((item, i) => (
                  <div key={i}>
                    <a href={item.ipfUrl} target="new">
                      {item.file}
                    </a>
                    <br />
                  </div>
                ))}
                <form id="captureMedia" onSubmit={this.handleSubmit}>
                  {/* <input type="file" onChange={this.captureFile} /> */}
                  {!this.props.disabelForm ? <FileInput
                    id="image-input"
                    onChange={this.captureFile}
                    accept="*"
                    name="images"
                    primary
                  /> : null }
                </form>
              </div>
            </Card>
          </Cell>
        </Grid>
      </div>
    );
  }
}

AddNew.propTypes = {
  viewUser: PropTypes.object,
  onSubmit: PropTypes.func,
  addPerson: PropTypes.func,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loading: state.loadingState.loading
  };
}

export default connect(mapStateToProps, { addPerson })(AddNew);
