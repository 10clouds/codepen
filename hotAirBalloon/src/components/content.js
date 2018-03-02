import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ANIMATION_PHASES, {returnAnimationClassesNames} from './constants';
import '../styles/scss/components/article.css';

class Content extends React.Component {
	static propTypes = {
		animationState: PropTypes.oneOf(Object.keys(ANIMATION_PHASES)),
		setAnimationState: PropTypes.func.isRequired
	};

	readArticleClick = () => {
		this.props.setAnimationState(ANIMATION_PHASES.GO_TO)
	};

	render() {
		return (
			<article className='article'>
				<p className={classNames('article__subheader', returnAnimationClassesNames('article__subheader')[this.props.animationState])}>
					Product design
				</p>

				<div
					className={classNames('article__header', returnAnimationClassesNames('article__header')[this.props.animationState])}>
					<h1>
						<p>Hot Air Balloon</p>
						<p>as a Workshop</p>
						<p>Game</p>
					</h1>
				</div>

				<p className={classNames('article__desc', returnAnimationClassesNames('article__desc')[this.props.animationState])}>
					One answear is that Truth pertains to the possibility that the event will occur. If true - it must
					occur and if false - it cannot occur.
				</p>
				<button
					className={classNames('button button--gradient button--icon', returnAnimationClassesNames('button')[this.props.animationState])}
					onClick={this.readArticleClick} disabled={this.props.disabledReadArticleBtn}>
					<span>Read Article</span>
					<i className='icon icon-arrow-right'/>
				</button>
			</article>
		)
	}
}

export default Content;
