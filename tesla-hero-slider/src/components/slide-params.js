import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';
import './../styles/scss/components/slide-params.css';

let DELAY_TOP_SPEED = 500,
	DELAY_MPH = 750,
	DELAY_MILE_RANG = 1000;

class SlideParams extends Component {

	static propTypes = {
		activeCar: propTypes.object.isRequired,
		animationForward: propTypes.bool.isRequired
	};

	componentWillReceiveProps(props) {
		if (!props.animationForward) {
			DELAY_TOP_SPEED = 1000;
			DELAY_MILE_RANG = 500;
		}
	}

	render() {
		const { activeCar, animationForward } = this.props;

		return (
			<div className='tesla-slide-params'>
				<ul className='tesla-slide-params__list'>
					<li className='tesla-slide-params__item'>
						<p>
							<span className='tesla-slide-params__plus'>+</span>
							<AnimateValue
								test
								className='tesla-slide-params__value'
								animationForward={animationForward}
								value={activeCar.topSpeed}
								delay={DELAY_TOP_SPEED}/>
							<span className='tesla-slide-params__units'>Mph</span>
						</p>
						<p className='tesla-slide-params__name'>Top speed</p>
					</li>

					<li className='tesla-slide-params__item'>
						<p>
							<AnimateValue
								className='tesla-slide-params__value'
								animationForward={animationForward}
								value={activeCar.mph}
								delay={DELAY_MPH}/>
							<span className='tesla-slide-params__units'>S</span>
						</p>
						<p className='tesla-slide-params__name'>0-60 mph</p>
					</li>

					<li className='tesla-slide-params__item'>
						<p>
							<AnimateValue
								className='tesla-slide-params__value'
								animationForward={animationForward}
								value={activeCar.mileRange}
								delay={DELAY_MILE_RANG}/>
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
