import React from 'react';
import propTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './../styles/scss/components/buttons.css';
import './../styles/scss/components/slide-aside.css';

function SlideAside(props) {
	const activeCar = props.activeCar;
	return (
		<div className='tesla-slide-aside'>
			<h1 className='tesla-slide-aside__wholename'>
				<span>Tesla</span>
				<TransitionGroup component='span' className='tesla-slide-aside__name'>
					<CSSTransition key={activeCar.name} timeout={{enter: 800, exit: 800}}
					               className='tesla-slide-aside__name-part' classNames='tesla-slide-aside__name-part-'
					               mountOnEnter={true} unmountOnExit={true}>
						<span> {activeCar.name}</span>
					</CSSTransition>
				</TransitionGroup>
			</h1>

			<TransitionGroup className='tesla-slide-aside__desc'>
				<CSSTransition key={activeCar.desc} timeout={{enter: 400, exit: 500}}
				               className='tesla-slide-aside__desc-text'
				               classNames='tesla-slide-aside__desc-text-' mountOnEnter={true} unmountOnExit={true}>
					<p>{activeCar.desc}</p>
				</CSSTransition>
			</TransitionGroup>

			<div className='tesla-slide-aside__button'
			     style={{'--color': activeCar.color}}>
				<button className='button'>
					Reserve now
				</button>

				<TransitionGroup>
					<CSSTransition className='button__border' key={activeCar.color} timeout={400} mountOnEnter={true}
					               unmountOnExit={true} classNames='button__border-'>
						<span style={{'--color': activeCar.color}}/>
					</CSSTransition>
				</TransitionGroup>
			</div>
		</div>
	);
}

SlideAside.propTypes = {
	activeCar: propTypes.object.isRequired
};

export default SlideAside;
