import React from "react";
import { Button } from "reactstrap";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/Header/Header";
import Icon from "../../components/Icon/Icon";
import CardList from "../../components/CardList/CardList";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { setCurrentSettlement } from "../../actions/getUserData";

class Settlements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSetRedirect = this.handleSetRedirect.bind(this);
  }
  handleSetRedirect(id) {
    console.log("id", id);
    setCurrentSettlement(id)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
    // window.location.pathname = `/settlements/${id}/settlement`;
    browserHistory.push(`/settlements/${id}`);
  }
  renderSettlements() {
    if (this.props.userData && this.props.userData.dashboard) {
      return this.props.userData.dashboard.settlements.map(settlement => {
        return (
          // <CardList
          //   name={settlement.sheet.name}
          //   desc={settlement.sheet.campaign}
          //   action={() => this.handleSetRedirect(settlement.sheet._id.$oid)}
          //   key={settlement.sheet._id.$oid}
          //   meta={[
          //     { label: "Year", value: settlement.sheet.lantern_year },
          //     { label: "Population", value: settlement.sheet.population },
          //     { label: "Expansions", value: settlement.sheet.expansions.length }
          //   ]}
          // />
          <CardList
            name={settlement.$oid}
            action={() => this.handleSetRedirect(settlement.$oid)}
            key={settlement.$oid}
          />
        );
      });
    }
    return <LoadingSpinner />;
  }
  render() {
    return (
      <div>
        <Header name={"Settlements"} back="/more">
          <Link to={"/settlements/create"} className="header-action">
            <Icon name={"plus"} />
          </Link>
        </Header>
        <div className="layout">{this.renderSettlements()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userData: state.userData };
}

export default connect(mapStateToProps, null)(Settlements);
