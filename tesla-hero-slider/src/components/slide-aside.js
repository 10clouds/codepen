import React from 'react';
import propTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

function SlideAside(props) {
	const activeCar = props.activeCar;
	return (
		<div className="tesla-slide__aside">
			<h1 className="tesla-slide__wholename">
				<span> Tesla </span>
				<TransitionGroup component="span" className="tesla-slide__name">
					<CSSTransition key={activeCar.name} timeout={{enter: 800, exit: 800}} className="tesla-slide__name-part" classNames="tesla-slide__name-part-" mountOnEnter={true} unmountOnExit={true}>
						<span> {activeCar.name}</span>
					</CSSTransition>
				</TransitionGroup>
			</h1>

			<TransitionGroup className="tesla-slide__desc">
				<CSSTransition key={activeCar.desc} timeout={{enter: 400, exit: 500}} className="tesla-slide__desc-text" classNames="tesla-slide__desc-text-" mountOnEnter={true} unmountOnExit={true}>
					<p>{activeCar.desc}</p>
				</CSSTransition>
			</TransitionGroup>

			<TransitionGroup className=" tesla-slide__button">
				<CSSTransition key={activeCar.desc} timeout={400} className="button" classNames="button-" mountOnEnter={true} unmountOnExit={true}>
					<button style={{
						'--color': activeCar.color
					}}>
						Reserve now
					</button>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}

SlideAside.propTypes = {
	activeCar: propTypes.object.isRequired
};

export default SlideAside;
