import * as React from 'react'
import styled from 'styled-components'
import Table from './Table'
import Filters from './Filters'
import PropTypes from 'prop-types'
import { ThemeContext } from './../theme-context'

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  transition: all 0;
  vertical-align: top;
  width: calc(100% - 220px);
  padding-right: 10px;
  margin-left: 220px;
`

class TableContainer extends React.Component {

  static propTypes = {
    barTransform: PropTypes.string ,
    displayMask: PropTypes.bool,
  }

  state = {
    //currency: 'USD',
  }

  render() {

    return (
      <TableWrapper>
        <Filters callback={ this.callback } />
        <ThemeContext.Consumer>
          {({ selectedFilters }) => {
            return (
              <Table
                barTransform={ this.props.barTransform }
                displayMask={ this.props.displayMask }
                selectedFilters={ selectedFilters }
              />
            )
          }}
        </ThemeContext.Consumer>
      </TableWrapper>
    )
  }
}

export default TableContainer
