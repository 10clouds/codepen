import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';
import './../styles/scss/components/slide.css';

class Slide extends Component {

	static propTypes = {
		activeSlide: propTypes.object.isRequired,
		animationForward: propTypes.bool.isRequired
	}

	componentWillReceiveProps(props) {
		console.log(props)
	}

	render() {
		const activeCar = this.props.activeSlide,
			animationForward = this.props.animationForward;
		return (
			<div className="tesla-slide" style={this.props.transitionStyle}>
				<div className="tesla-slide__desc">

					<h1>
						Tesla<span> {activeCar.name}</span>
					</h1>
					<p>{activeCar.desc}</p>

					<button className="button tesla-slide__button"
					        style={{
						        '--color': activeCar.color
					        }}>
						Reserve now
					</button>
				</div>
				<div className="tesla-slide__bckg"
				     style={{
					     '--bckg-color': activeCar.color,
					     '--bckg-height': activeCar.bckgHeight + 'px',
					     '--shadow-opacity': activeCar.shadowOpacity
				     }}></div>
				<div className="tesla-slide__img"
				     style={{
					     '--bckg-color': activeCar.color,
					     '--car-shadow-height': activeCar.carShadowHeight + 'px'
				     }}>
					<img src={activeCar.imgUrl} alt=""/>
				</div>
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
			</div>
		);
	}
}

export default Slide;
