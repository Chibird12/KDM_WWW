import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { getAya } from '../../actions/getAya';
import Stat from '../../components/Stats/Stats';

class Aya extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ayaData: null,
      modal: false,
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    this.props.getAya();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ayaData) {
      this.setState({
        ayaData: nextProps.ayaData,
      });
    }
  }
  // handleShowModal() {
  //   this.setState({
  //     showModal: true,
  //   });
  // }
  // handleCloseModal() {
  //   this.setState({
  //     showModal: false,
  //   });
  // }
  // handleSubmitStuff() {
  //   // send stuff to api
  // }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  render() {
    if (this.state.ayaData) {
      return (
        <div className="page-aya">
          <main className="main">

            <h2>Box</h2>
            <p>A box is a container to put things in.</p>

            <h2>Stats</h2>
            <p>Shows data, supports <em>number</em>, <em>milestones</em>, <em>title</em></p>

            <div className="box">
              <header className="box-header">
                <div className="box-header-title">Box</div>
              </header>
              <div className="box-content">
                <div className="statGroup">
                  <Stat />
                  <Stat title="title" number="10" />
                  <Stat title="Test" number="5" milestone={['empty', 'empty']} />
                </div>
              </div>
            </div>

            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} >
                  Tab1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} >
                  Moar Tabs
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card block>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card block>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>

            <Button color="danger" onClick={this.toggleModal}>Toggle</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader>
                Survival <br />
                <small>Max: 1</small>
              </ModalHeader>
              <ModalBody>
                <div className="statSpend">
                  <button type="button" className="statSpend-change">&ndash;</button>
                  <div className="statSpend-num">1</div>
                  <button type="button" className="statSpend-change">+</button>
                </div>
                <div className="text-xs-center">
                  or <br />
                  <Button>Spend Survival</Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleModal}>Do Something</Button>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>

          </main>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return { ayaData: state.ayaData };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAya }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Aya);
