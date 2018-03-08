import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';
import './../styles/scss/components/slide-params.css';


class SlideParams extends Component {

	static propTypes = {
		activeCar: propTypes.object.isRequired,
		animationForward: propTypes.bool.isRequired
	};

	state = {
		delayTopSpeed: 0,
		delayMph: 0,
		delayMileRange: 0
	};

	componentWillReceiveProps(props) {
		let delay = 500,
			delayTopSpeed = delay + 500,
			delayMph = delay + 250,
			delayMileRange = delay;

		if (props.animationForward) {
			delayTopSpeed = delay;
			delayMileRange = delay + 500;
		}

		this.setState({
			delayTopSpeed,
			delayMph,
			delayMileRange
		})
	}

	render() {
		let activeCar = this.props.activeCar,
			animationForward = this.props.animationForward;
		return (
			<div className='tesla-slide-params'>
				<ul className='tesla-slide-params__list'>
					<li className='tesla-slide-params__item'>
						<p>
							<span className='tesla-slide-params__plus'>+</span>
							<AnimateValue
								valueClass='tesla-slide-params__value'
								animationForward={animationForward}
								value={activeCar.topSpeed}
								delay={this.state.delayTopSpeed}/>
							<span className='tesla-slide-params__units'>Mph</span>
						</p>
						<p className='tesla-slide-params__name'>Top speed</p>
					</li>

					<li className='tesla-slide-params__item'>
						<p>
							<AnimateValue
								valueClass='tesla-slide-params__value'
								animationForward={animationForward}
								value={activeCar.mph}
								delay={this.state.delayMph}/>
							<span className='tesla-slide-params__units'>S</span>
						</p>
						<p className='tesla-slide-params__name'>0-60 mph</p>
					</li>

					<li className='tesla-slide-params__item'>
						<p>
							<AnimateValue
								valueClass='tesla-slide-params__value'
								animationForward={animationForward}
								value={activeCar.mileRange}
								delay={this.state.delayMileRange}/>
							<span className='tesla-slide-params__units'>mi</span>
						</p>
						<p className='tesla-slide-params__name'>Mile Range</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default SlideParams;
