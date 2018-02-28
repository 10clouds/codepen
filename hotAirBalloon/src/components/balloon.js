import React, {Fragment} from 'react';
import classNames from 'classnames';
import balloonImg from './../assets/images/balloon.png';
import fireBig from './../assets/images/fire-big.png';
import fireMedium from './../assets/images/fire-medium.png';
import fireSmall from './../assets/images/fire-small.png';
import Flame from './flame.js';
import Cloud from './cloud.js';
import CloudsContainer from './clouds-container';
import '../styles/scss/components/balloon.css';
import PropTypes from "prop-types";

class Balloon extends React.Component {

    static propTypes = {
        animationState: PropTypes.oneOf(['ANIMATION_START', 'ANIMATION_GO_TO', 'ANIMATION_RESET']),
        setAnimationState: PropTypes.func.isRequired
    };

    closeContainerAnimation = (e) => {
        if (this.props.animationState === 'ANIMATION_GO_TO') {
            if (e.target === e.currentTarget) {
                this.props.setAnimationState('ANIMATION_RESET');

                setTimeout(() => {
                    this.props.setAnimationState('ANIMATION_START');
                }, 6000)
            }
        }
    };

    render() {
        const animationReset = this.props.animationState === 'ANIMATION_RESET',
            animationIn = this.props.animationState === 'ANIMATION_START',
            animationOut = this.props.animationState === 'ANIMATION_GO_TO';

        return (
            <div className={classNames('balloon', {
                'balloon--animation-reset': animationReset,
                'balloon--animation-in': animationIn,
                'balloon--animation-out': animationOut,
            })}>

                <div className={classNames('balloon__wrapper', {
                    'balloon__wrapper--animation-out': animationOut
                })} onAnimationEnd={this.closeContainerAnimation}>

                    <div className={classNames('balloon__wrapper-pulse', {
                        'balloon__wrapper-pulse--animation-out': animationOut
                    })}>

                        <img src={balloonImg} alt=""
                             className={classNames('balloon__img balloon__img--balloon', {
                                 'balloon__img--animation-reset': animationReset,
                                 'balloon__img--animation-in': animationIn,
                                 'balloon__img--animation-out': animationOut
                             })}/>

                        <div className="balloon__fire">
                            <Flame src={fireBig} size='big' animationState={this.props.animationState}/>
                            <Flame src={fireMedium} size='medium' animationState={this.props.animationState}/>
                            <Flame src={fireSmall} size='small' animationState={this.props.animationState}/>
                        </div>
                    </div>
                </div>

                <div className={classNames('balloon__clouds', {
                    'balloon__clouds--animation-reset': animationReset,
                    'balloon__clouds--animation-in': animationIn,
                    'balloon__clouds--animation-out': animationOut
                })}>
                    <CloudsContainer
                        containerSelector='.main-content'
                        animationState={this.props.animationState}
                        render={(props) => (
                            <Fragment>
                                <Cloud position='right' multiplier={0.04}
                                       animationState={this.props.animationState} {...props}/>
                                <Cloud position='left' multiplier={0.03}
                                       animationState={this.props.animationState}  {...props}/>
                                <Cloud position='behind' multiplier={0.025}
                                       animationState={this.props.animationState} {...props}/>
                            </Fragment>
                        )}/>
                </div>

                <div className="balloon__bckg-img"></div>
                {/*separate div with background for proper animation*/}
            </div>
        )
    }
}

export default Balloon;
