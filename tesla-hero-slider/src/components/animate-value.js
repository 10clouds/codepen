import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';

class AnimateValue extends Component {

	static propTypes = {
		className: propTypes.string,
		value: propTypes.number.isRequired,
		delay: propTypes.number
	};

	static defaultProps = {
		delay: 0
	};

	state = {
		value: 0
	};

	timeout = null;

	componentWillReceiveProps(props) {
		this.timeout = setTimeout(() => {
			this.setState({value: props.value});
		}, props.delay);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
		this.timeout = null;
	}

	render() {
		return (
			<AnimatedNumber
				className={this.props.className}
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
