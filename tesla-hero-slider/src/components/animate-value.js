import React, {Component} from 'react';
import propTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class AnimateValue extends Component {

	static propTypes = {
		className: propTypes.string,
		value: propTypes.number.isRequired,
		delay: propTypes.number,
		duration: propTypes.number,
		interval: propTypes.number,
		minRandom: propTypes.number,
		maxRandom: propTypes.number
	};

	static defaultProps = {
		delay: 0,
		duration: 600,
		interval: 100,
		prefix: '',
		sufix: '',
		minRandom: 1,
		maxRandom: 999
	};

	state = {
		value: 0
	};

	timeout = null;
	timer = null;

	componentWillReceiveProps(props) {
		if (this.props.value !== props.value) {
			this.timeout = setTimeout(() => {
				this.animateValue(props.value, props.duration, props.interval);
			}, props.delay);
		}
	}

	animateValue(value, duration, interval) {
		let spentTime = 0;

		this.timer = setInterval(() => {
			spentTime += interval;

			this.setState({
				value: this.getRandomInteger(this.props.minRandom, this.props.maxRandom)
			});

			if (spentTime >= duration) {
				this.setState({value});
				clearInterval(this.timer);
			}
		}, interval);
	}

	getRandomInteger(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
		clearTimeout(this.timer);
		this.timeout = this.timer = null;
	}

	render() {
		return (
			<div>
				{this.props.prefix !== '' ?
					<span className='tesla-slide-params__prefix'>{this.props.prefix}</span> : ''}
				<TransitionGroup component='div' className='tesla-slide-params__wrapper'>
					<CSSTransition key={this.state.value} timeout={0}
					               classNames={`${this.props.className}-`}
					               className={this.props.className}
					               mountOnEnter={true} unmountOnExit={true}
					               onEntered={this.handleEnter}>
						<span> {this.state.value}
							{this.props.sufix !== '' ?
								<span className='tesla-slide-params__sufix'>{this.props.sufix}</span> : ''}</span>
					</CSSTransition>
				</TransitionGroup>
			</div>

		);
	}
}

export default AnimateValue;
