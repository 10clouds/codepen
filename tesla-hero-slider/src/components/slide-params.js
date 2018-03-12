import React, { Component } from 'react';
import propTypes from 'prop-types';
import AnimateValue from './animate-value';
import './../styles/scss/components/slide-params.css';

let DELAY_TOP_SPEED = 200,
  DELAY_MPH = 700,
  DELAY_MILE_RANG = 1200;

class SlideParams extends Component {
  static propTypes = {
    activeCar: propTypes.object.isRequired,
    animationForward: propTypes.bool.isRequired
  };

  componentWillReceiveProps(props) {
    if (!props.animationForward) {
      DELAY_TOP_SPEED = 1200;
      DELAY_MILE_RANG = 200;
    }
  }

  render() {
    const {activeCar} = this.props;

    return (
      <div className='tesla-slide-params'>
        <ul className='tesla-slide-params__list'>
          <li className='tesla-slide-params__item'>
            <div className='tesla-slide-params__wrapper'>
              <span className='tesla-slide-params__prefix'>+</span>
              <AnimateValue
                className='tesla-slide-params__value'
                value={activeCar.topSpeed}
                delay={DELAY_TOP_SPEED}/>
              <span className='tesla-slide-params__sufix'>mph</span>
            </div>

            <p className='tesla-slide-params__name'>Top speed</p>
          </li>

          <li className='tesla-slide-params__item'>
            <div className='tesla-slide-params__wrapper'>
              <AnimateValue
                className='tesla-slide-params__value'
                value={activeCar.mph}
                delay={DELAY_MPH}/>
              <span className='tesla-slide-params__sufix'>s</span>
            </div>
            <p className='tesla-slide-params__name'>0-60 mph</p>
          </li>

          <li className='tesla-slide-params__item'>
            <div className='tesla-slide-params__wrapper'>
              <AnimateValue
                className='tesla-slide-params__value'
                value={activeCar.mileRange}
                delay={DELAY_MILE_RANG}/>
              <span className='tesla-slide-params__sufix'>mi</span>
            </div>
            <p className='tesla-slide-params__name'>Mile Range</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default SlideParams;
