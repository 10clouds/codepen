import React, {Component} from 'react';
import propTypes from 'prop-types';
import './../styles/scss/components/slide.css';

class Slide extends Component {

	static propTypes = {
		activeSlide: propTypes.object.isRequired
	}

	render() {
		const activeCar = this.props.activeSlide;
		return (
			<div className={`tesla-slide tesla-slide-${this.props.stateClass}`}>
				<div className="tesla-slide__desc">
					<h1>Tesla {activeCar.name}</h1>
					<p>{activeCar.desc}</p>
					<button className="button tesla-slide__button" style={{borderColor: activeCar.color}}>
						Reserve now
					</button>
				</div>
				<div className="tesla-slide__bckg"
				     style={{
				     	'--bckg-color': activeCar.color,
					     '--bckg-height': activeCar.bckgHeight +'px',
					     '--shadow-opacity': activeCar.shadowOpacity
				     }}></div>
				<div className="tesla-slide__img">
					<img src={activeCar.imgUrl} alt=""/>
				</div>
				<div className="tesla-slide__params">
					<ul className="tesla-slide__params-list">
						<li className="tesla-slide__params-item">
							<p>
								<span className="tesla-slide__params-value"><span>+</span>{activeCar.topSpeed}</span>
								<span className="tesla-slide__params-units">Mph</span>
							</p>
							<p className="tesla-slide__params-name">Top speed</p>
						</li>
						<li className="tesla-slide__params-item">
							<p>
								<span className="tesla-slide__params-value">{activeCar.mph}</span>
								<span className="tesla-slide__params-units">S</span>
							</p>
							<p className="tesla-slide__params-name">0-60 mph</p>
						</li>
						<li className="tesla-slide__params-item">
							<p>
								<span className="tesla-slide__params-value">{activeCar.mileRange}</span>
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
