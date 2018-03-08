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

	setAnimationState = animationState => this.setState({animationState});

	componentDidMount() {
		this.setState({
			activeSlide: 3
		});
		this.setAnimationState(ANIMATION_PHASES.PENDING);
	}

	componentWillMount() {
		document.body.addEventListener('wheel', this.handleScroll.bind(this));
	}

	componentWillUnmount() {
		document.body.removeEventListener('wheel', this.handleScroll);
	}

	setActiveSlide(slideId) {
		var animationForward = '';
		this.state.activeSlide < slideId ? animationForward = true : animationForward = false;

		this.setState({
			activeSlide: slideId,
			animationForward
		});

		this.setAnimationState(ANIMATION_PHASES.PENDING);
	}

	handleScroll(e) {
		if (window.innerWidth < 1200) {
			return;
		}

		e.preventDefault();

		if (this.state.animationState === ANIMATION_PHASES.PENDING) {
			return;
		}
		if (e.deltaY < 0 && this.state.activeSlide !== 0) {
			this.setAnimationState(ANIMATION_PHASES.PENDING);

			this.setState((prevState) => {
				return {activeSlide: prevState.activeSlide - 1}
			});
		}
		if (e.deltaY > 0 && this.state.activeSlide !== this.state.slidesCount - 1) {
			this.setAnimationState(ANIMATION_PHASES.PENDING);

			this.setState((prevState) => {
				return {activeSlide: prevState.activeSlide + 1}
			})
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
