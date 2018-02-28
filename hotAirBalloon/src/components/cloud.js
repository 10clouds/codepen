import PropTypes from 'prop-types'
import React from 'react';
import '../styles/scss/components/clouds.css';
import cloud from './../assets/images/cloud.svg';
import classNames from "classnames";

class Cloud extends React.Component {

    static propTypes = {
        animationState: PropTypes.oneOf(['ANIMATION_START', 'ANIMATION_GO_TO', 'ANIMATION_RESET']),
        multiplier: PropTypes.number.isRequired
    };

    state = {
        translateX: 0,
        translateY: 0,
        canStartMouseMoveAnimation: false
    };

    componentWillReceiveProps(props) {
        if (this.props.animationState === 'ANIMATION_RESET') {
            this.setState({
                canStartMouseMoveAnimation: false,
                translateX: 0,
                translateY: 0
            });
        } else if (this.props.animationState === 'ANIMATION_GO_TO') {
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

    }

    setCanStartMouseMoveAnimation = (e) => {
        if (this.props.animationState === 'ANIMATION_START') {
            this.setState({
                canStartMouseMoveAnimation: true
            });
        }
    };

    render() {
        return (
            <img src={cloud} alt=""
                 style={{
                     transform: `translate(${this.state.translateX}%,${this.state.translateY}%)`
                 }} onAnimationEnd={this.setCanStartMouseMoveAnimation}

                 className={classNames(`cloud-img cloud-img--${this.props.position}`, {
                     'cloud-img--animation-in': (this.props.animationState === 'ANIMATION_START' && !this.state.canStartMouseMoveAnimation),
                     'cloud-img--animation-out': this.props.animationState === 'ANIMATION_GO_TO',
                     'cloud-img--animation-reset': this.props.animationState === 'ANIMATION_RESET',
                 })}
            />
        )
    }
}

export default Cloud;
