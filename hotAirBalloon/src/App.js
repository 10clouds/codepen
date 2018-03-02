import React, {Component} from 'react';
import MainContent from './components/main-content';
import ANIMATION_PHASES from './components/constants'

class App extends Component {
    state = {
        animationState: null
    };

    setAnimationState = animationState => this.setState({animationState});

    componentDidMount() {
        this.setAnimationState(ANIMATION_PHASES.START);
    }

    render() {
        return (
            <div className="container">
                <MainContent animationState={this.state.animationState} setAnimationState={this.setAnimationState}/>
            </div>
        );
    }
}

export default App;
