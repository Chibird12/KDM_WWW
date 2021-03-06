import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { Input, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { setName } from "../../../actions/getSurvivor";
import { bindActionCreators } from "redux";

class NameChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      originalValue: ""
    };
    // Binding Events
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSave = this.handleNameSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    this.prepareComponentState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }
  prepareComponentState(props) {
    const newState = {};
    if (props.params && props.params.survivorId && props.settlementData) {
      const survivorId = props.params.survivorId;
      newState.survivorId = survivorId;

      const survivor = props.settlementData.user_assets.survivors.find(
        item => item.sheet._id.$oid === survivorId
      );
      newState.value = survivor.sheet.name;
      newState.originalValue = survivor.sheet.name;
    }
    this.setState({
      ...newState
    });
  }
  handleNameChange(e) {
    this.setState({ value: e.target.value });
  }
  // Handle's the save and makes the API Call
  handleNameSave() {
    const userId = localStorage.getItem("userId");
    const data = {
      user_id: userId,
      name: this.state.value
    };
    this.handleClose();
    this.props.setName(this.props.params.survivorId, data).catch(e => {
      alert("Sorry an error has occured");
    });
  }
  confirmColor() {
    if (this.state.value === this.state.originalValue) {
      return "light";
    }
    return "primary";
  }
  handleClose() {
    browserHistory.push(
      `/settlements/${this.props.params.oid}/survivors/${this.props.params
        .survivorId}`
    );
  }
  // Renders our component
  render() {
    return (
      <div>
        <ModalHeader>Rename</ModalHeader>
        <ModalBody>
          <Input
            value={this.state.name}
            type="text"
            name="name"
            placeholder="Enter survivor name..."
            required
            onChange={this.handleNameChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color={this.confirmColor()} onClick={this.handleNameSave}>
            Rename
          </Button>
          <Button onClick={this.handleClose} color="link">
            Cancel
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settlementData: state.settlementData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setName
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(NameChange);
