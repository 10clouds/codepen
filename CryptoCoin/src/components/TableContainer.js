import * as React from 'react'
import styled from 'styled-components'
import Table from './Table'
import Filters from './Filters'

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: scroll;
  transition: all 0;
  vertical-align: top;
  width: calc(100% - 220px);
  padding-right: 10px;
`

class TableContainer extends React.Component {
  render() {
    return (
      <TableWrapper>
        <Filters />
        <Table barTransform={ this.props.barTransform } displayMask={ this.props.displayMask} />
      </TableWrapper>
    )
  }
}

export default TableContainer
