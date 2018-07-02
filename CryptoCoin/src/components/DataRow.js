import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import cn from 'classnames'

const Row = styled.div`
  display: flex;
  height: 75px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform ${ props => props.initialAnimation ? '1s' : '.3s' } ease-out, opacity .2s ease-in;
  /* ease-in ${ props => props.rowAnimationDelay }s */
  margin: 0 -5px;
  box-shadow: 1px 3px 68px 0 rgba(0, 0, 0, 0.15);
  transform: scale(1.02, 1) perspective(900px) rotateX(70deg);
  opacity: .2;

  &.resize {
    transform: scale(1, 1) perspective(0) rotateX(0);
    transform-origin: center center;
    opacity: 1;
  }

  &:hover {
    transform: scale(1.015, 1.1);
  }
`

const Background = styled.div`
  background-color: ${ props => props.theme.barColor };
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -3;
`

const Slider = styled.div`
  background-color: ${ props => props.theme.barColor };
  height: 100%;
  position: absolute;
  top: 0;
  transform: translateX(-100%);
  transition: ${ props => props.duration }s transform ease-in ${ props => props.delay }s;
  width: 100%;
  z-index: -1;

  &.transform {
    transform: translateX(0);
  }
`

const Mask = styled.div`
  background-color: ${ props => props.theme.oppositeBarColor };
  display: ${ props => props.visible ? 'block' : 'none' };
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -2;
`

class DataRow extends React.Component {

  state = {
    transform: '-100%',
    displayMask: this.props.displayMask,
    trans: false,
  }

  componentDidMount() {
    this.setState({
      resize: true,
      initialAnimation: true,
    })


    setTimeout(() => {
      this.setState({ initialAnimation: false })
    }, 1000 )
  }

  render() {
    const classname = cn({
      'transform': this.props.barTransform === '0'
    })

    const rowCn = cn({
      'resize': this.state.resize,
    })

    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          return (
            <Row
              theme={ theme }
              className={ rowCn }
              initialAnimation={ this.state.initialAnimation }
              rowAnimationDelay={ this.props.delay }
            >
              <Background theme={ theme } />
              <Mask
                className="mask"
                theme={ theme }
                visible={this.props.displayMask}
              />
              <Slider
                className={ classname }
                delay={ this.props.delay }
                duration={ this.props.duration }
                theme={ theme }
              />
              { this.props.children }
            </Row>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default DataRow
