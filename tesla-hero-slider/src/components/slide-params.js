import React from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';

function SlideParams(props) {
	const activeCar = props.activeCar;
	const animationForward = props.animationForward;
	return (
		<div className="tesla-slide__params">
			<ul className="tesla-slide__params-list">
				<li className="tesla-slide__params-item">
					<p>
						<span className="tesla-slide__params-plus">+</span>
						<AnimateValue
							valueClass="tesla-slide__params-value"
							animationForward={animationForward}
							topSpeed={activeCar.topSpeed}/>
						<span className="tesla-slide__params-units">Mph</span>
					</p>
					<p className="tesla-slide__params-name">Top speed</p>
				</li>

				<li className="tesla-slide__params-item">
					<p>
						<AnimateValue
							valueClass="tesla-slide__params-value"
							animationForward={animationForward}
							mph={activeCar.mph}/>
						<span className="tesla-slide__params-units">S</span>
					</p>
					<p className="tesla-slide__params-name">0-60 mph</p>
				</li>

				<li className="tesla-slide__params-item">
					<p>
						<AnimateValue
							valueClass="tesla-slide__params-value"
							animationForward={animationForward}
							mileRange={activeCar.mileRange}/>
						<span className="tesla-slide__params-units">mi</span>
					</p>
					<p className="tesla-slide__params-name">Mile Range</p>
				</li>
			</ul>
		</div>
	);
}


SlideParams.propTypes = {
	activeCar: propTypes.object.isRequired,
	animationForward: propTypes.bool.isRequired
};


export default SlideParams;
