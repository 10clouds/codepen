import React from 'react' ;
import PropTypes from 'prop-types';
import Balloon from './balloon';
import Content from './content';
import Menu from './menu';
import logo from './../assets/images/logo.svg'
import classNames from "classnames";

function MainContent(props) {

    const animationReset = props.animationState === 'ANIMATION_RESET',
        animationIn = props.animationState === 'ANIMATION_START',
        animationOut = props.animationState === 'ANIMATION_GO_TO';

    return (
        <div className={classNames('main-content', {
            'main-content--animation-in': animationIn,
            'main-content--animation-out': animationOut,
            'main-content--animation-reset': animationReset,
        })}>

            <Menu containerClassName="main-content__nav" {...props} />

            <div className={classNames('main-content__article', {
                'main-content__article--animation-in': animationIn,
                'main-content__article--animation-out': animationOut,
                'main-content__article--animation-reset': animationReset,
            })}>

                <div className="main-content__img">
                    <img src={logo} alt=""
                         className={classNames('logo', {
                             'logo--animation-in': animationIn,
                             'logo--animation-out': animationOut,
                             'logo--animation-reset': animationReset,
                         })}
                    />
                </div>
                <Content disabledReadArticleBtn={props.animationState === 'ANIMATION_GO_TO' || props.animationState === 'ANIMATION_RESET'} {...props}/>
            </div>

            <div className="main-content__aside">
                <Balloon {...props} />
            </div>
        </div>
    )
}

MainContent.propTypes = {
    animationState: PropTypes.oneOf(['ANIMATION_START', 'ANIMATION_GO_TO', 'ANIMATION_RESET'])
}

export default MainContent;