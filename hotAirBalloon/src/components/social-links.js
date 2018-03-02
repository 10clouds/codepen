import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ANIMATION_PHASES, {returnAnimationClassesNames} from './constants';
import '../styles/scss/components/social-links.css';

function SocialLinks(props) {
    return (
        <ul className={classNames('social-links', returnAnimationClassesNames('social-links')[props.animationState])}>
            <li className='social-links__item social-links__item--facebook'>
                <a className='social-links__link' href='https://www.facebook.com' target='_blank'
                   rel='noreferrer noopener'>
                    <i className='icon icon-facebook'></i>
                </a>
            </li>
            <li className='social-links__item social-links__item--twitter'>
                <a className='social-links__link' href='https://www.twitter.com' target='_blank'
                   rel='noreferrer noopener'>
                    <i className='icon icon-twitter'></i>
                </a>
            </li>
            <li className='social-links__item social-links__item--dribble'>
                <a className='social-links__link ' href='https://www.dribble.com' target='_blank'
                   rel='noreferrer noopener'>
                    <i className='icon icon-dribble'></i>
                </a>
            </li>
        </ul>
    )
}

SocialLinks.propTypes = {
    animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
    socialLinksClass: PropTypes.string.isRequired
};

export default SocialLinks;
