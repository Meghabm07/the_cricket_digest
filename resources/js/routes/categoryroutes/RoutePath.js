import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import CreateForm from '../../components/user/admin/category/subcomponents/createform';
import EditForm from '../../components/user/admin/category/subcomponents/editform';
import ConfirmDelete from '../../components/user/admin/category/subcomponents/confirmdelete';

class RoutePath extends Component {
	componentDidMount() {
		console.log('route mounted');
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/category/create" component={CreateForm} />
					<Route path="/category/edit/:id" component={EditForm} />
					<Route path="/category/delete/:id" component={ConfirmDelete} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default RoutePath;
