import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// TODO
// - Make it so that you can pass a link/action if you click on it
// - If this is true then change the color of the header

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerClass: classNames({
        "widget-header": true,
        "widget-header--link": this.props.event || this.props.link
      })
    };
  }
  renderHeader() {
    if (this.props.title) {
      return (
        <header className={this.state.headerClass}>
          <div className="widget-header-title">{this.props.title}</div>
        </header>
      );
    }
    return null;
  }
  renderContent() {
    if (this.props.event) {
      return (
        <button type="button" className="widget-content">
          {this.props.children}
        </button>
      );
    }
    return <div className="widget-content">{this.props.children}</div>;
  }
  render() {
    return (
      <div className={classNames(["widget", this.props.className])}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

Widget.defaultProps = {
  className: ""
};

Widget.propTypes = {
  title: PropTypes.string,
  link: PropTypes.bool,
  event: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Widget;
