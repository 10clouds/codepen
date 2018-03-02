import React, {Fragment} from 'react';
import classNames from 'classnames';
import Flame from './flame';
import Cloud from './cloud';
import CloudsContainer from './clouds-container';
import PropTypes from 'prop-types';
import ANIMATION_PHASES, {returnAnimationClassesNames} from './constants';
import balloonImg from './../assets/images/balloon.png';
import fireBig from './../assets/images/fire-big.png';
import fireMedium from './../assets/images/fire-medium.png';
import fireSmall from './../assets/images/fire-small.png';
import '../styles/scss/components/balloon.css';

class Balloon extends React.Component {
	static propTypes = {
		animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
		setAnimationState: PropTypes.func.isRequired
	};

	timeout = null;

	closeContainerAnimation = (e) => {
		if (this.props.animationState !== ANIMATION_PHASES.GO_TO) return;
		if (e.target === e.currentTarget) {
			this.props.setAnimationState(ANIMATION_PHASES.RESET);

			this.timeout = setTimeout(() => {
				this.props.setAnimationState(ANIMATION_PHASES.START);
			}, 6000)
		}
	};

	componentWillUnmount() {
		clearTimeout(this.timeout);
		this.timeout = null;
	}

	renderBalloon(classPrefix) {
		return <div
			className={classNames('balloon__wrapper', returnAnimationClassesNames('balloon__wrapper')[this.props.animationState])}
			onAnimationEnd={this.closeContainerAnimation}>

			<div
				className={classNames('balloon__wrapper-pulse', returnAnimationClassesNames('balloon__wrapper-pulse')[this.props.animationState])}>

				<img src={balloonImg} alt=''
				     className={classNames(`${classPrefix} ${classPrefix}--balloon`,
					     returnAnimationClassesNames(classPrefix)[this.props.animationState])}/>

				<div className='balloon__fire'>
					<Flame src={fireBig} size='big' animationState={this.props.animationState}/>
					<Flame src={fireMedium} size='medium' animationState={this.props.animationState}/>
					<Flame src={fireSmall} size='small' animationState={this.props.animationState}/>
				</div>

			</div>
		</div>
	}

	renderClouds(classPrefix) {
		return (
			<div
				className={classNames(classPrefix, returnAnimationClassesNames(classPrefix)[this.props.animationState])}>
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
			</div>);
	}

	render() {

		return (
			<div className={classNames('balloon', returnAnimationClassesNames('balloon')[this.props.animationState])}>
				{this.renderBalloon('balloon__img')}
				{this.renderClouds('balloon__clouds')}

				<div className='balloon__bckg-img'></div>
				{/*separate div with background for proper animation*/}
			</div>
		)
	}
}

export default Balloon;
