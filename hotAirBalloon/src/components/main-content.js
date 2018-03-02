import React from 'react';
import PropTypes from 'prop-types';
import Balloon from './balloon';
import Content from './content';
import Menu from './menu';
import classNames from 'classnames';
import ANIMATION_PHASES, {returnAnimationClassesNames} from './constants';
import logo from './../assets/images/logo.svg';

function MainContent(props) {
	return (
		<div className={classNames('main-content', returnAnimationClassesNames('main-content')[props.animationState])}>

			<Menu containerClassName='main-content__nav' {...props} />

			<div
				className={classNames('main-content__article', returnAnimationClassesNames('main-content__article')[props.animationState])}>

				<div className='main-content__img'>
					<img src={logo} alt='' className={classNames('logo', returnAnimationClassesNames('logo')[props.animationState])}/>
				</div>
				<Content
					disabledReadArticleBtn={props.animationState === ANIMATION_PHASES.GO_TO || props.animationState === ANIMATION_PHASES.RESET} {...props}/>
			</div>

			<div className='main-content__aside'>
				<Balloon {...props} />
			</div>
		</div>
	);
}

MainContent.propTypes = {
	animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
};

export default MainContent;
