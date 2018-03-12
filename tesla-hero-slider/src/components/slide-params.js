import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';
import './../styles/scss/components/slide-params.css';

let DELAY_TOP_SPEED = 200,
	DELAY_MPH = 700,
	DELAY_MILE_RANG = 1200;

class SlideParams extends Component {

	static propTypes = {
		activeCar: propTypes.object.isRequired,
		animationForward: propTypes.bool.isRequired
	};

	componentWillReceiveProps(props) {
		if (!props.animationForward) {
			DELAY_TOP_SPEED = 1200;
			DELAY_MILE_RANG = 200;
		}
	}

	render() {
		const {activeCar, animationForward} = this.props;

		return (
			<div className='tesla-slide-params'>
				<ul className='tesla-slide-params__list'>
					<li className='tesla-slide-params__item'>
						<AnimateValue
							className='tesla-slide-params__value'
							animationForward={animationForward}
							value={activeCar.topSpeed}
							delay={DELAY_TOP_SPEED}
							prefix="+"
							sufix='Mph'
							minRandom={10}/>
						<p className='tesla-slide-params__name'>Top speed</p>
					</li>

					<li className='tesla-slide-params__item'>
						<AnimateValue
							className='tesla-slide-params__value'
							animationForward={animationForward}
							value={activeCar.mph}
							delay={DELAY_MPH}
							sufix='S'
							minRandom={1}
							maxRandom={9}/>
						<p className='tesla-slide-params__name'>0-60 mph</p>
					</li>

					<li className='tesla-slide-params__item'>
						<AnimateValue
							className='tesla-slide-params__value'
							animationForward={animationForward}
							value={activeCar.mileRange}
							delay={DELAY_MILE_RANG}
							sufix='mi'
							minRandom={100}/>
						<p className='tesla-slide-params__name'>Mile Range</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default SlideParams;
