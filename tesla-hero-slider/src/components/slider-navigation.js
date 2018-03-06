import React, {Component} from 'react';
import propTypes from 'prop-types';
import './../styles/scss/components/slider-navigation.css';

class SliderNavigation extends Component {

	static propTypes = {
		setActiveSlide: propTypes.func.isRequired
	}


	componentDidMount(){
		console.log(this.props);
	}

	changeActiveSlide(e){
		e.preventDefault();
		this.props.setActiveSlide(e.target.getAttribute('data-id'));
	}

	render() {
		return (
			<div className="tesla-slider-navigation">
				<ul className="tesla-slider-navigation__list">
					{this.props.carsNames.map((car) => {
						return (
							<li key={car.id} className="tesla-slider-navigation__item">
								<a href="#" onClick={this.changeActiveSlide.bind(this)}
								   className={`tesla-slider-navigation__link ${this.props.carsNames[this.props.activeSlide] == car ? 'tesla-slider-navigation__link--active' : ''}`}
								   style={{color: this.props.carsNames[this.props.activeSlide] == car ? car.color : ''}}
								   data-id={this.props.carsNames.indexOf(car)}>
									{car.name}
									</a>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}

export default SliderNavigation;
