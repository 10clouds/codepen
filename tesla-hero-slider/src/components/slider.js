import React, {Component} from 'react';
import Slide from './slide';
import SliderNavigation from './slider-navigation';
import roadsterImg from './../assets/images/roadster.png';
import truckImg from './../assets/images/truck.png';
import mouseImg from './../assets/images/mouse.svg';
import './../styles/scss/components/slider.css';
import {Transition, CSSTransition} from 'react-transition-group/Transition'

const slides = [
	{
		id: 1,
		name: 'Model S',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
		color: '#0047fd',
		imgUrl: truckImg,
		bckgHeight: 300,
		shadowOpacity: 0.2,
		topSpeed: 65,
		mph: 5,
		mileRange: 500
	},
	{
		id: 2,
		name: 'Model X',
		desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		color: '#ee0101',
		imgUrl: roadsterImg,
		bckgHeight: 250,
		shadowOpacity: 0.5,
		topSpeed: 250,
		mph: 1.9,
		mileRange: 620
	},
	{
		id: 3,
		name: 'Model 3',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
		color: '#0047fd',
		imgUrl: truckImg,
		bckgHeight: 300,
		shadowOpacity: 0.2,
		topSpeed: 65,
		mph: 5,
		mileRange: 500
	},
	{
		id: 4,
		name: 'Roadster',
		desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		color: '#ee0101',
		imgUrl: roadsterImg,
		bckgHeight: 250,
		shadowOpacity: 0.5,
		topSpeed: 250,
		mph: 1.9,
		mileRange: 620
	},
	{
		id: 5,
		name: 'Semi truck',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
		color: '#0047fd',
		imgUrl: truckImg,
		bckgHeight: 300,
		shadowOpacity: 0.2,
		topSpeed: 65,
		mph: 5,
		mileRange: 500
	}
];

class Slider extends Component {

	state = {
		activeSlide: 0,
		animationForward: true
	};


	componentDidMount() {
		this.setState({
			activeSlide: 3
		})
	}

	setActiveSlide(slideId) {
		var animationForward = '';

		this.state.activeSlide > slideId ? animationForward = true : animationForward = false

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

				<Slide animationForward={this.state.animationForward}
				       activeSlide={slides[this.state.activeSlide]}></Slide>

				<div className="tesla-slider__scroll">
					<img src={mouseImg} alt=""/>
				</div>
			</div>
		);
	}
}

export default Slider;
