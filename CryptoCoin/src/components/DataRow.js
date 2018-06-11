import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import cn from 'classnames'

const Row = styled.div`
  display: flex;
  height: 75px;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 1;
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
  }

  render() {
    const classname = cn({
      'transform': this.props.barTransform === 0
    })

    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            <Row theme={ theme } >
              <Background theme={ theme } />
              <Mask className="mask" theme={ theme } visible={this.props.displayMask} />
              <Slider className={ classname } theme={ theme } delay={ this.props.delay } duration={ this.props.duration } />
              { this.props.children }
            </Row>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default DataRow
