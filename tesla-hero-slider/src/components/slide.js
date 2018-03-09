import React, {Component} from 'react';
import propTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import SlideParams from './slide-params';
import SlideAside from './slide-aside';
import './../styles/scss/components/slide.css';


class Slide extends Component {

	static propTypes = {
		activeSlide: propTypes.object.isRequired,
		animationForward: propTypes.bool.isRequired,
		setAnimationState: propTypes.func.isRequired,
		ANIMATION_PHASES: propTypes.object.isRequired
	};

	handleTransitionEnd(e) {
		//checking both elements if they do not have classes -enter/-exit
		if (e.currentTarget.className === 'tesla-slide__img'
			&& e.target.className === 'tesla-slide__img-floor') {
			this.props.setAnimationState(this.props.ANIMATION_PHASES.STOP)
		}
	}

	render() {
		const activeCar = this.props.activeSlide,
			animationForward = this.props.animationForward;
		return (
			<div className={`tesla-slide ${animationForward ? 'animation-forward' : 'animation-back'}`}>

				<SlideAside activeCar={activeCar}/>

				<TransitionGroup>
					<CSSTransition key={activeCar.name} timeout={{enter: 700, exit: 1200}}
					               className='tesla-slide__bckg' classNames='tesla-slide__bckg-'
					               mountOnEnter={true} unmountOnExit={true}>
						<div style={{
							'--bckg-color': activeCar.color,
							'--bckg-height': activeCar.bckgHeight + 'px',
							'--shadow-opacity': activeCar.shadowOpacity
						}}>
							<div className='tesla-slide__bckg-fill'></div>
						</div>
					</CSSTransition>
				</TransitionGroup>

				<TransitionGroup>
					<CSSTransition key={activeCar.name} timeout={{enter: 700, exit: 1200}}
					               className='tesla-slide__img' classNames='tesla-slide__img-'
					               mountOnEnter={true} unmountOnExit={true}
					               onTransitionEnd={this.handleTransitionEnd.bind(this)}>
						<div
							className='tesla-slide__img'
							style={{
								'--bckg-color': activeCar.color,
								'--car-shadow-height': activeCar.carShadowHeight + 'px'
							}}>
							<img className='tesla-slide__img-floor' src={activeCar.imgFloorUrl} alt=''/>
							<img className='tesla-slide__img-car' src={activeCar.imgUrl} alt=''/>
						</div>
					</CSSTransition>
				</TransitionGroup>

				<SlideParams activeCar={activeCar} animationForward={animationForward}/>
			</div>
		);
	}
}

export default Slide;
