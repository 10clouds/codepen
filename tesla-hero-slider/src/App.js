import React, {Component} from 'react';
import Header from './components/header';
import Slider from './components/slider';
import './styles/scss/styles.css';

class App extends Component {
	render() {
		return (
			<div className="container">
				<Header></Header>
				<Slider></Slider>
			</div>
		);
	}
}

export default App;
