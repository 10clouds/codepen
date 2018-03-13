import React from 'react';
import raf from 'raf';
import bezierEasing from 'bezier-easing';
import lodash from 'lodash';

function animate(render, duration, easing, interval, delay, next = () => null) {
  const start = Date.now();

  (function loop() {
    const current = Date.now(),
      delta = current - start,
      step = delta / (duration + delay);

    if (delta >= delay) {
      lodash.debounce(() => {
        if (step > 1) {
          render(1);
          next();
        } else {
          raf(loop);
          render(easing(step * 2));
        }
      }, interval)();
    } else {
      raf(loop);
    }

  })();
}

export const myEasing = bezierEasing(.4, -0.7, .1, 1.5);

class AnimValue extends React.Component {
  static defaultProps = {
    delay: 0,
    duration: 1000,
    interval: 100,
    transformFn: value => Math.floor(value)
  };

  node = null;

  animate(previousValue, newValue, applyFn, interval) {
    const diff = newValue - previousValue;

    animate(
      step =>
        applyFn(this.props.transformFn(previousValue + diff * step, step), step),
      this.props.duration,
      myEasing,
      interval,
      this.props.delay
    );
  }

  setValue = (value, step) => {
    if (step === 1) {
      this.node.style.opacity = 1;
    } else {
      this.node.style.opacity = 0.7;
    }

    if (!this.node) {
      return;
    }
    this.node.innerHTML = value;
  };

  componentDidMount() {
    this.animate(0, this.props.value, this.setValue, this.props.interval);
  }

  componentWillReceiveProps(props) {
    let previousValue = this.props.value;

    if (previousValue !== props.value) {
      this.animate(previousValue, props.value, this.setValue, this.props.interval);
    }
  }

  render() {
    return <span className={this.props.className} children='0' ref={node => (this.node = node)}/>;
  }
}

class AnimateValue extends React.Component {
  render() {
    return (
      <AnimValue
        className={this.props.className}
        delay={this.props.delay}
        value={this.props.value}
        transformFn={(value, step) =>
          step === 1 ? (value % 1 != 0 ? value.toFixed(1) : value) : Math.abs(Math.floor(value))
        }
      />
    );
  }
}

export default AnimateValue;
