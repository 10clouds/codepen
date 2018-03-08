import React, {Component} from 'react';
import Slide from './slide';
import SliderNavigation from './slider-navigation';
import slides from './sliders-data';
import mouseImg from './../assets/images/mouse.svg';
import './../styles/scss/components/slider.css';

const ANIMATION_PHASES = {
	PENDING: 'PENDING',
	STOP: 'STOP'
};

class Slider extends Component {

	state = {
		activeSlide: 0,
		animationForward: true,
		slidesCount: slides.length,
		animationState: null
	};

	slider = {
		header: '',
		content: ''
	};


	componentDidMount() {
		this.setState({
			activeSlide: 3
		});
		this.setAnimationState(ANIMATION_PHASES.PENDING);

		this.slider.header = document.querySelector('.tesla-header');
		this.slider.content = document.querySelector('.tesla-slider')

		document.body.addEventListener('wheel', this.handleScroll.bind(this));
	}

	componentWillUnmount() {
		document.body.removeEventListener('wheel', this.handleScroll);
	}

	setAnimationState = animationState => this.setState({animationState});

	setActiveSlide(slideId) {
		this.setState({
			activeSlide: slideId,
			animationForward: this.state.activeSlide < slideId ? true : false
		});

		this.setAnimationState(ANIMATION_PHASES.PENDING);
	}

	handleScroll(e) {
		let sliderHeight = this.slider.content.clientHeight,
			headerHeight = this.slider.header.clientHeight;

		if (window.innerHeight < (sliderHeight + headerHeight)) {
			return; // do not handle scroll effect when window height is smaller than slider plus header height
		}

		e.preventDefault();

		if (this.state.animationState === ANIMATION_PHASES.PENDING) {
			return;
		}
		if (e.deltaY < 0 && this.state.activeSlide !== 0) {
			this.setActiveSlide(this.state.activeSlide - 1);
		}
		if (e.deltaY > 0 && this.state.activeSlide !== this.state.slidesCount - 1) {
			this.setActiveSlide(this.state.activeSlide + 1)
		}
	}

	render() {
		return (
			<div className='tesla-slider'>

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
					activeSlide={slides[this.state.activeSlide]}
					animationState={this.state.animationState}
					setAnimationState={this.setAnimationState}
					animatonPhases={ANIMATION_PHASES}/>

				<div className='tesla-slider__scroll'>
					<img src={mouseImg} alt=''/>
				</div>
			</div>
		);
	}
}

export default Slider;
