import React, { Component } from "react";
import PropTypes from "prop-types";

class TextList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list
    };
  }
  // updates props
  componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      this.setState({
        list: nextProps.list
      });
    }
  }
  renderName(name) {
    if (this.props.showDetails) {
      return <strong className="textList-item-name">{name}</strong>;
    }
    return name;
  }
  renderDescription(item) {
    if (this.props.showDetails && item.desc) {
      return (
        <div
          className="textList-item-desc"
          dangerouslySetInnerHTML={{ __html: item.desc }}
        />
      );
    }
    return null;
  }
  renderList() {
    const num = Math.max(this.props.minimum, this.state.list.length);
    return [...Array(num)].map((_, i) => {
      if (this.state.list[i]) {
        return (
          <li className="textList-item" key={i}>
            {this.renderName(this.state.list[i].name)}
            {this.renderDescription(this.state.list[i])}
          </li>
        );
      }
      return (
        <li className="textList-item" key={i}>
          - -
        </li>
      );
    });
  }
  render() {
    return <ul className="textList">{this.renderList()}</ul>;
  }
}

TextList.defaultProps = {
  minimum: 1,
  list: [],
  showDetails: false
};

TextList.propTypes = {
  minimum: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string,
      survivor_effect: PropTypes.string
    })
  ),
  showDetails: PropTypes.bool
};

export default TextList;
