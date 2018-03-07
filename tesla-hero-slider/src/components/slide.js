import React, {Component} from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './../styles/scss/components/slide.css';

class Slide extends Component {

	static propTypes = {
		activeSlide: propTypes.object.isRequired,
		animationForward: propTypes.bool.isRequired
	}

	renderAside(activeCar) {
		return (
			<div className="tesla-slide__aside">

				<h1 className="tesla-slide__wholename">
						<span>
							Tesla
						</span>
					<TransitionGroup component="span" className="tesla-slide__name">
						<CSSTransition key={activeCar.name}
						               timeout={{enter: 800, exit: 800}}
						               className="tesla-slide__name-part"
						               classNames="tesla-slide__name-part-"
						               mountOnEnter={true} unmountOnExit={true}>
							<span> {activeCar.name}</span>
						</CSSTransition>
					</TransitionGroup>
				</h1>

				<TransitionGroup className="tesla-slide__desc">
					<CSSTransition key={activeCar.desc}
					               timeout={{enter: 400, exit: 500}}
					               className="tesla-slide__desc-text" classNames="tesla-slide__desc-text-"
					               mountOnEnter={true} unmountOnExit={true}>
						<p>{activeCar.desc}</p>
					</CSSTransition>
				</TransitionGroup>

				<TransitionGroup className=" tesla-slide__button">
					<CSSTransition key={activeCar.desc} timeout={400}
					               className="button" classNames="button-"
					               mountOnEnter={true} unmountOnExit={true}>
						<button style={{
							'--color': activeCar.color
						}}>
							Reserve now
						</button>
					</CSSTransition>
				</TransitionGroup>
			</div>
		)
	}

	renderParams(activeCar, animationForward) {
		return (<div className="tesla-slide__params">
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
		</div>)
	}

	render() {
		const activeCar = this.props.activeSlide,
			animationForward = this.props.animationForward;
		return (
			<div className={`tesla-slide ${animationForward ? 'animation-forward' : 'animation-back'}`}
			     style={this.props.transitionStyle}>

				{this.renderAside(activeCar)}

				<TransitionGroup>
					<CSSTransition key={activeCar.name} timeout={{enter: 700, exit: 1200}}
					               className="tesla-slide__bckg" classNames="tesla-slide__bckg-"
					               mountOnEnter={true} unmountOnExit={true}>
						<div style={{
							'--bckg-color': activeCar.color,
							'--bckg-height': activeCar.bckgHeight + 'px',
							'--shadow-opacity': activeCar.shadowOpacity
						}}>
							<div className="tesla-slide__bckg-fill"></div>
						</div>
					</CSSTransition>
				</TransitionGroup>

				<TransitionGroup>
					<CSSTransition key={activeCar.name} timeout={{enter: 700, exit: 1200}}
					               className="tesla-slide__img" classNames="tesla-slide__img-"
					               mountOnEnter={true} unmountOnExit={true}>
						<div className="tesla-slide__img"
						     style={{
							     '--bckg-color': activeCar.color,
							     '--car-shadow-height': activeCar.carShadowHeight + 'px'
						     }}>
							<img className="tesla-slide__img-floor" src={activeCar.imgFloorUrl} alt=""/>
							<img className="tesla-slide__img-car" src={activeCar.imgUrl} alt=""/>
						</div>
					</CSSTransition>
				</TransitionGroup>


				{this.renderParams(activeCar, animationForward)}

			</div>
		);
	}
}

export default Slide;
