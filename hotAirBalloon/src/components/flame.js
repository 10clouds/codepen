import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ANIMATION_PHASES from './constants';
import '../styles/scss/components/flame.css';

const Flame = (props) => {
    return (
        <img src={props.src} alt=''
             className={classNames(`flame-img flame-img--${props.size}`, {
                 'flame-img--animation-out': props.animationState === ANIMATION_PHASES.GO_TO,
             })}
        />
    );
};

Flame.propTypes = {
    animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
};

export default Flame;
