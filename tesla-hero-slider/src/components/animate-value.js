import React, {Component} from 'react';
import AnimatedNumber from 'react-animated-number';

class AnimateValue extends Component {

	state = {
		value: 0
	}

	timeout = '';

	componentWillReceiveProps(props) {
		var delay = 500, value = 0;

		if (props.topSpeed > 0) {
			value = props.topSpeed;
			props.animationForward ? delay : delay += 500;
		} else if (props.mph > 0) {
			delay += 250;
			value = props.mph;
		} else if (props.mileRange > 0) {
			props.animationForward ? delay += 500 : delay;
			value = props.mileRange;
		}

		this.timeout = setTimeout(() => {
			this.setState({value});
		}, delay)
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
				component="span"/>
		);
	}
}

export default AnimateValue;
