import React, {Component} from 'react';
import MainContent from './components/main-content';

class App extends Component {

    state = {
        animationState: null
    };

    setAnimationState = animationState => this.setState({animationState: animationState});

    componentDidMount() {
        this.setAnimationState('ANIMATION_START');
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

