import React from 'react';
import propTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './../styles/scss/components/buttons.css';
import './../styles/scss/components/slide-aside.css';
import SetCSSVariables from './css-varibles';

function SlideAside(props) {
  const activeCar = props.activeCar;
  return (
    <div className='tesla-slide-aside'>
      <h1 className='tesla-slide-aside__wholename'>
        <span>Tesla</span>
        <TransitionGroup component='span' className='tesla-slide-aside__name'>
          <CSSTransition
            key={activeCar.name}
            timeout={{enter: 800, exit: 1000}}
            className='tesla-slide-aside__name-part'
            classNames='tesla-slide-aside__name-part-'
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <span>{activeCar.name}</span>
          </CSSTransition>
        </TransitionGroup>
      </h1>
      <TransitionGroup className='tesla-slide-aside__desc'>
        <CSSTransition
          key={activeCar.desc}
          timeout={{enter: 900, exit: 1200}}
          className='tesla-slide-aside__desc-text'
          classNames='tesla-slide-aside__desc-text-'
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <p>{activeCar.desc}</p>
        </CSSTransition>
      </TransitionGroup>

      <div className='tesla-slide-aside__button'>
        <button className='button'>Reserve now</button>

        <TransitionGroup>
          <CSSTransition
            key={activeCar.color}
            timeout={{enter: 800, exit: 1000}}
            mountOnEnter={true}
            unmountOnExit={true}
            classNames='button__border-'
          >
            <SetCSSVariables cssVariables={{'--btn-color': activeCar.color}}>
              <span className='button__border'/>
            </SetCSSVariables>
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
