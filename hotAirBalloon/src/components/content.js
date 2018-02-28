import React from 'react';
import '../styles/scss/components/article.css';
import classNames from "classnames";
import PropTypes from "prop-types";


class Content extends React.Component {
    static propTypes = {
        animationState: PropTypes.oneOf(['ANIMATION_START', 'ANIMATION_GO_TO', 'ANIMATION_RESET']),
        setAnimationState: PropTypes.func.isRequired
    };

    readArticleClick = (e) => {
        this.props.setAnimationState('ANIMATION_GO_TO')
    };

    render() {
        const animationReset = this.props.animationState === 'ANIMATION_RESET',
            animationIn = this.props.animationState === 'ANIMATION_START',
            animationOut = this.props.animationState === 'ANIMATION_GO_TO';

        return (
            <article className="article">
                <p className={classNames('article__subheader', {
                    'article__subheader--animation-in': animationIn,
                    'article__subheader--animation-out': animationOut,
                    'article__subheader--animation-reset': animationReset,
                })}>
                    Product design
                </p>

                <div className={classNames('article__header', {
                    'article__header--animation-in': animationIn,
                    'article__header--animation-out': animationOut,
                    'article__header--animation-reset': animationReset,
                })}>
                    <h1>
                        <p>Hot Air Balloon</p>
                        <p>as a Workshop</p>
                        <p>Game</p>
                    </h1>
                </div>

                <p className={classNames('article__desc', {
                    'article__desc--animation-in': animationIn,
                    'article__desc--animation-out': animationOut,
                    'article__desc--animation-reset': animationReset,
                })}>
                    One answear is that Truth pertains to the possibility that the event will occur. If true - it must
                    occur and if false - it cannot occur.
                </p>
                <button className={classNames('button button--gradient button--icon', {
                    'button--animation-in': animationIn,
                    'button--animation-out': animationOut,
                    'button--animation-reset': animationReset,
                })}

                        onClick={this.readArticleClick}
                        disabled={this.props.disabledReadArticleBtn}>
                    <span>Read Article</span>
                    <i className="icon icon-arrow-right"></i>
                </button>
            </article>
        )
    }
}

export default Content;
