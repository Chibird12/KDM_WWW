import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './components/Nav/Nav';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSettlement } from './actions/getSettlement';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageName: 'Page Name',
			nav: [
				// {
				// 	title: 'Dashboard',
				// 	link: '/',
				// 	icon: 'logo',
				// 	children: [
				// 		{
				// 			title: 'Settlements',
				// 			link: '/settlements',
				// 		},
				// 		{
				// 			title: 'System',
				// 			link: '/system',
				// 		},
				// 		{
				// 			title: 'World Stats',
				// 			link: '/world',
				// 		},
				// 		{
				// 			title: 'About',
				// 			link: '/about',
				// 		},
				// 		{
				// 			title: 'Log Out',
				// 			link: '/log-out',
				// 		},
				// 	],
				// },
				// {
				// 	title: 'Campaign Log',
				// 	icon: 'log',
				// 	link: '/settlements/1234/log',
				// 	children: [
				// 		{
				// 			title: 'Campaign Log',
				// 			link: '/settlements/1234/log',
				// 		},
				// 	],
				// },
				{
					title: 'Settlement',
					icon: 'settlement',
					link: '/settlements/1234/log',
				},
				{
					title: 'Survivors',
					icon: 'survivors',
					link: '/settlements/1234/survivors/',
				},
				{
					title: 'Resources',
					icon: 'storage',
					link: '/settlements/1234/storage',
				},
				{
					title: 'Menu',
					icon: 'menu',
					link: '/settlements/1234/more',
				},
			],
		};
	}
	componentDidMount(){
		this.props.getSettlement();
	}
	render() {
		let subName = this.props.routes[2] ? this.props.routes[2].title : null;
		let superSubName = this.props.routes[3] ? this.props.routes[3].title : null;
		let showBack = this.props.routes[3] ? this.props.routes[3].back : null;
		return (
			<div className="app">
				<Nav
					data={this.state.nav}
					showBack={showBack}
				/>
				<Header
					name={this.props.routes[1].title}
					subName={subName}
					superSubName={superSubName}
					showBack={showBack}
				/>
				<main className="main">
					{ React.cloneElement(this.props.children, {...this.props}) }
				</main>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.node,
};

function mapStateToProps(state) {
	return {
		settlementData: state.settlementData,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getSettlement,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
