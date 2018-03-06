import React, {Component} from 'react';
import Slide from './slide';
import SliderNavigation from './slider-navigation';
import slides from './sliders-data';
import mouseImg from './../assets/images/mouse.svg';
import './../styles/scss/components/slider.css';


class Slider extends Component {

	state = {
		activeSlide: 3,
		animationForward: true,
	};

	componentDidMount() {
		this.setState({
			activeSlide: 3
		})
	}

	setActiveSlide(slideId) {
		var animationForward = '';
		this.state.activeSlide < slideId ? animationForward = true : animationForward = false;
		this.setState({
			activeSlide: slideId,
			animationForward: animationForward
		})
	}

	render() {
		return (
			<div className="tesla-slider">

				<SliderNavigation activeSlide={this.state.activeSlide}
				                  setActiveSlide={this.setActiveSlide.bind(this)}
				                  carsNames={slides.map(slide => {
					                  return {
						                  id: slide.id,
						                  name: slide.name,
						                  color: slide.color
					                  }
				                  })}/>

				<Slide
					animationForward={this.state.animationForward}
					activeSlide={slides[this.state.activeSlide]}></Slide>

				<div className="tesla-slider__scroll">
					<img src={mouseImg} alt=""/>
				</div>
			</div>
		);
	}
}

export default Slider;
