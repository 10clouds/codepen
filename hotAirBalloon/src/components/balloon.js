import React, {Fragment} from 'react';
import classNames from 'classnames';
import Flame from './flame';
import Cloud from './cloud';
import CloudsContainer from './clouds-container';
import PropTypes from 'prop-types';
import ANIMATION_PHASES, {returnAnimationClassesNames} from './constants';
import balloonImg from './../assets/images/balloon.png';
import fireBig from './../assets/images/fire-big.svg';
import fireMedium from './../assets/images/fire-medium.svg';
import fireSmall from './../assets/images/fire-small.svg';
// import balloonCorps from './../assets/images/balloon/balloon-corps';
import balloonStateNormal from './../assets/images/balloon/balloon-state-normal.svg';
import balloonStateOut from './../assets/images/balloon/balloon-state-out.svg';
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
			className={classNames(`${classPrefix}__wrapper`, returnAnimationClassesNames(`${classPrefix}__wrapper`)[this.props.animationState])}
			onAnimationEnd={this.closeContainerAnimation}>

			<div
				className={classNames(`${classPrefix}__wrapper-pulse`, returnAnimationClassesNames(`${classPrefix}__wrapper-pulse`)[this.props.animationState])}>

				<div
					className={classNames(`${classPrefix}__img-container`, returnAnimationClassesNames(`${classPrefix}__img-container`)[this.props.animationState])}>

					<img src={balloonImg} alt=''
					     className={classNames(`${classPrefix}__img ${classPrefix}__img--balloon`,
						     returnAnimationClassesNames(`${classPrefix}__img`)[this.props.animationState])}/>

					{/*<img src={balloonCorps} alt=''*/}
					{/*className={classNames(`${classPrefix}__img ${classPrefix}__img--corps`,*/}
					{/*returnAnimationClassesNames(`${classPrefix}__img`)[this.props.animationState])}/>*/}

					<img src={balloonStateNormal} alt=''
					     className={classNames(`${classPrefix}__img ${classPrefix}__img--state ${classPrefix}__img--state-normal`,
						     returnAnimationClassesNames(`${classPrefix}__img--state-normal`)[this.props.animationState])}/>
					<img src={balloonStateOut} alt=''
					     className={classNames(`${classPrefix}__img ${classPrefix}__img--state ${classPrefix}__img--state-out`,
						     returnAnimationClassesNames(`${classPrefix}__img--state-out`)[this.props.animationState])}/>


					<div className={classNames(`${classPrefix}__balloon-fire`,
						returnAnimationClassesNames(`${classPrefix}__balloon-fire`)[this.props.animationState])}>
						<img src={fireBig} alt=''
						     className={`${classPrefix}__img ${classPrefix}__img--fire ${classPrefix}__img--fire-behind`}/>
						<img src={fireBig} alt=''
						     className={`${classPrefix}__img ${classPrefix}__img--fire ${classPrefix}__img--fire-front`}/>
					</div>
				</div>

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
				{this.renderBalloon('balloon')}
				{this.renderClouds('balloon__clouds')}

				<div className='balloon__bckg-img'></div>
				{/*separate div with background for proper animation*/}
			</div>
		)
	}
}

export default Balloon;
