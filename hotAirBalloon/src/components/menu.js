import PropTypes from 'prop-types'
import React from 'react';
import SocialLinks from './social-links';
import classNames from 'classnames';
import ANIMATION_PHASES, {returnAnimationClassesNames} from './constants';
import '../styles/scss/components/navigation.css';

function Menu(props) {
    return (
        <div
            className={classNames(props.containerClassName, returnAnimationClassesNames(props.containerClassName)[props.animationState])}>
            <nav className='navigation'>
                <button className='button navigation__btn'>
                    <i className='icon icon-menu'></i>
                </button>

                <div className='navigation__social-links'>
                    <SocialLinks socialLinksClass='navigation__social-links'
                                 animationState={props.animationState}></SocialLinks>
                </div>
            </nav>
        </div>
    )
}

Menu.propTypes = {
    animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
    containerClassName: PropTypes.string.isRequired
};

export default Menu;
