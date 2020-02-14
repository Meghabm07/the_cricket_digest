import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Product extends Component {
	render() {
		return <div>Product</div>;
	}
}

if (document.getElementById('product')) {
	ReactDOM.render(<Product />, document.getElementById('product'));
}
