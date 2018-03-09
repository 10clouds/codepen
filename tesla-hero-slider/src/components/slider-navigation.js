import React, {Component} from 'react';
import propTypes from 'prop-types';
import './../styles/scss/components/slider-navigation.css';

class SliderNavigation extends Component {

	static propTypes = {
		setActiveSlide: propTypes.func.isRequired,
		carsNames: propTypes.array.isRequired
	};

	render() {
		return (
			<div className='tesla-slider-navigation'>
				<ul className='tesla-slider-navigation__list'>
					{this.props.carsNames.map((car) =>
						<li key={car.id} className='tesla-slider-navigation__item'>
							<a href='#'
							   onClick={event => {
								   event.preventDefault();
								   this.props.setActiveSlide(this.props.carsNames.indexOf(car))
							   }}
							   className={`tesla-slider-navigation__link ${this.props.carsNames[this.props.activeSlide] === car ? 'tesla-slider-navigation__link--active' : ''}`}
							   style={{color: this.props.carsNames[this.props.activeSlide] === car ? car.color : ''}}>
								{car.name}
							</a>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default SliderNavigation;
