import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';

class AnimateValue extends Component {

	static propTypes = {
		valueClass: propTypes.string,
		value: propTypes.number.isRequired,
		delay: propTypes.number
	};

	state = {
		value: 0
	};

	timeout = '';

	componentWillReceiveProps(props) {
		let delay = 0;

		if (props.delay > 0) {
			delay = props.delay
		}

		this.timeout = setTimeout(() => {
			this.setState({value: props.value});
		}, delay);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
		this.timeout = '';
	}

	render() {
		return (
			<AnimatedNumber
				className={this.props.valueClass}
				style={{
					transition: '0.8s ease-out',
					transitionProperty:
						'background-color, color, opacity'
				}}
				frameStyle={perc => (
					perc === 100 ? {} : {opacity: 0.95}
				)}
				stepPrecision={0}
				duration={400}
				value={this.state.value}
				component='span'/>
		);
	}
}

export default AnimateValue;
