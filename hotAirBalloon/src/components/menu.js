import PropTypes from 'prop-types'
import React from 'react';
import '../styles/scss/components/navigation.css';
import SocialLinks from './social-links';
import classNames from "classnames";

function Menu(props) {
    return (
        <div className={classNames(props.containerClassName, {
            [`${props.containerClassName}--animation-in`]: props.animationState === 'ANIMATION_START',
            [`${props.containerClassName}--animation-out`]: props.animationState === 'ANIMATION_GO_TO',
            [`${props.containerClassName}--animation-reset`]: props.animationState === 'ANIMATION_RESET'
        })}>
            <nav className="navigation">
                <button className="button navigation__btn">
                    <i className="icon icon-menu"></i>
                </button>

                <div className="navigation__social-links">
                    <SocialLinks socialLinksClass="navigation__social-links"
                                 animationState={props.animationState}></SocialLinks>
                </div>
            </nav>
        </div>
    )
}

Menu.propTypes = {
    animationState: PropTypes.oneOf(['ANIMATION_START', 'ANIMATION_GO_TO', 'ANIMATION_RESET']),
    containerClassName: PropTypes.string.isRequired
};

export default Menu;
