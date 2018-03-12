import React, { Component } from 'react';
import propTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SlideParams from './slide-params';
import SlideAside from './slide-aside';
import './../styles/scss/components/slide.css';
import SetCSSVariables from './css-varibles';

class Slide extends Component {
  static propTypes = {
    activeSlide: propTypes.object.isRequired,
    animationForward: propTypes.bool.isRequired,
    setAnimationState: propTypes.func.isRequired,
    ANIMATION_PHASES: propTypes.object.isRequired
  };

  handleEnter = e => {
    this.props.setAnimationState(this.props.ANIMATION_PHASES.STOP);
  };

  render() {
    const { activeSlide, animationForward } = this.props;

    return (
      <div className={`tesla-slide ${animationForward ? 'animation-forward' : 'animation-back'}`}>
        <SlideAside activeCar={activeSlide} />

        <TransitionGroup>
          <CSSTransition
            key={activeSlide.name}
            timeout={{ enter: 800, exit: 1000 }}
            classNames='tesla-slide__bckg-'
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <SetCSSVariables
              cssVariables={{
                '--car-color': activeSlide.color,
                '--bckg-height': activeSlide.bckgHeight + 'px',
                '--shadow-opacity': activeSlide.shadowOpacity,
                '--car-shadow-height': activeSlide.carShadowHeight + 'px'
              }}
            >
              <div className='tesla-slide__bckg'>
                <div className='tesla-slide__bckg-fill' />
              </div>
            </SetCSSVariables>
          </CSSTransition>
        </TransitionGroup>

        <TransitionGroup>
          <CSSTransition
            key={activeSlide.name}
            timeout={{ enter: 700, exit: 1200 }}
            classNames='tesla-slide__img-'
            mountOnEnter={true}
            unmountOnExit={true}
            onEntered={this.handleEnter}
          >
            <div className='tesla-slide__img'>
              <img className='tesla-slide__img-floor' src={activeSlide.imgFloorUrl} alt='' />
              <img className='tesla-slide__img-car' src={activeSlide.imgUrl} alt='' />
            </div>
          </CSSTransition>
        </TransitionGroup>

        <SlideParams activeCar={activeSlide} animationForward={animationForward} />
      </div>
    );
  }
}

export default Slide;
