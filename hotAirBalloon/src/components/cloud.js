import PropTypes from 'prop-types'
import React from 'react';
import classNames from 'classnames';
import ANIMATION_PHASES from './constants';
import '../styles/scss/components/clouds.css';
import cloud from './../assets/images/cloud.svg';

class Cloud extends React.Component {
    static propTypes = {
        animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
        multiplier: PropTypes.number.isRequired
    };

    state = {
        translateX: 0,
        translateY: 0,
        canStartMouseMoveAnimation: false
    };

    componentWillReceiveProps(props) {
        if (props.animationState === ANIMATION_PHASES.RESET) {
            this.setState({
                canStartMouseMoveAnimation: false,
                translateX: 0,
                translateY: 0
            });
        } else if (props.animationState === ANIMATION_PHASES.GO_TO) {
            this.setState({
                translateX: this.state.translateX,
                translateY: (this.state.translateY + 4)
            });
        }
        else if (this.state.canStartMouseMoveAnimation) {
            this.setState({
                translateX: (props.facX * props.multiplier) * 100,
                translateY: (props.facY * props.multiplier) * 100
            });
        }

        console.log(props.animationState)
    }

    setCanStartMouseMoveAnimation = (e) => {
        if (this.props.animationState === ANIMATION_PHASES.START) {
            this.setState({
                canStartMouseMoveAnimation: true
            });
        }
    };

    render() {
        return (
            <img src={cloud} alt=''
                 style={{
                     transform: `translate(${this.state.translateX}%,${this.state.translateY}%)`
                 }} onAnimationEnd={this.setCanStartMouseMoveAnimation}

                 className={classNames(`cloud-img cloud-img--${this.props.position}`, {
                     'cloud-img--animation-in': (this.props.animationState === ANIMATION_PHASES.START && !this.state.canStartMouseMoveAnimation),
                     'cloud-img--animation-out': this.props.animationState === ANIMATION_PHASES.GO_TO,
                     'cloud-img--animation-reset': this.props.animationState === ANIMATION_PHASES.RESET,
                 })}
            />
        )
    }
}

export default Cloud;
