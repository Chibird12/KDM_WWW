import React, { Component } from 'react';

class Nav extends Component {
  constructor(props){
    super(props);
  }
  // Caleb, you want to make custom functions that are invoked when the render function fires
  renderNodes(){
    return this.props.data.map((item, index )=> {
      return (
        <li key={index}>
          <a href="#" className={"mainNav-link" + (item.isActive ? ' is-active' : '')}>
            <div className="mainNav-link-icon">
              {/* TODO: replace this with svg icon */}
              <i className={"fa fa-" + item.icon} aria-hidden="true"></i>
            </div>
            {item.title}
          </a>
          <div className="subNav">
            <ol>
              <li><a href="#" className="is-active">Campaigns</a></li>
              <li><a href="#">Survivors</a></li>
              <li><a href="#">World</a></li>
              <li><a href="#">User Preferences</a></li>
            </ol>
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <nav className="mainNav">
        <ol>
          {this.renderNodes()}
       </ol>
     </nav>
    )
  }
}

export default Nav;
