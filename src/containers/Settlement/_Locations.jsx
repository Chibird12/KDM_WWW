import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Stat from "../../components/Stats/Stats";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: "Locations",
      amount: props.amount
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      amount: nextProps.amount
    });
  }
  // Toggles the visibility of the modal
  handleModalToggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  // Cancel event from the modal, reset the state.
  handleCancel() {
    this.handleModalToggle();
  }
  // Renders our component
  render() {
    return (
      <div className={"widget"}>
        <header className={"widget-header xwidget-header--link"}>
          <div className="widget-header-title">{this.state.title}</div>
        </header>
        <div className="widget-content">
          <Stat amount={this.state.amount} />
        </div>
        {/* <button
          type="button"
          className="widget-content"
          onClick={this.handleModalToggle}
        >
          <Stat amount={this.state.amount} />
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.handleCancel}>
          <ModalHeader>Adjust {this.state.title}</ModalHeader>
          <ModalBody>
            <Stat amount={this.state.amount} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleCancel} color="link">
              Close
            </Button>
          </ModalFooter>
        </Modal> */}
      </div>
    );
  }
}

Locations.propTypes = {
  amount: PropTypes.number
};

Locations.defaultProps = {
  amount: 0
};

export default Locations;
