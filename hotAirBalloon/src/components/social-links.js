import React from 'react';
import '../styles/scss/components/social-links.css';
import classNames from "classnames";
import PropTypes from "prop-types";

function SocialLinks(props) {
    return (
        <ul className={classNames('social-links', props.socialLinksClass, {
                'social-links--animation-in': props.animationState === 'ANIMATION_START',
                'social-links--animation-out': props.animationState === 'ANIMATION_GO_TO',
                'social-links--animation-reset': props.animationState === 'ANIMATION_RESET',
            })}
        >
            <li className="social-links__item social-links__item--facebook">
                <a className="social-links__link" href="https://www.facebook.com" target="_blank"
                   rel='noreferrer noopener'>
                    <i className="icon icon-facebook"></i>
                </a>
            </li>
            <li className="social-links__item social-links__item--twitter">
                <a className="social-links__link" href="https://www.twitter.com" target="_blank"
                   rel='noreferrer noopener'>
                    <i className="icon icon-twitter"></i>
                </a>
            </li>
            <li className="social-links__item social-links__item--dribble">
                <a className="social-links__link " href="https://www.dribble.com" target="_blank"
                   rel='noreferrer noopener'>
                    <i className="icon icon-dribble"></i>
                </a>
            </li>
        </ul>
    )
}

SocialLinks.propTypes = {
    animationState: PropTypes.oneOf(['ANIMATION_START', 'ANIMATION_GO_TO', 'ANIMATION_RESET']),
    socialLinksClass: PropTypes.string.isRequired
};

export default SocialLinks;
