import * as React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'
import Table from './Table'
import FiltersContainer from './Filters'

const TableWrapper = styled.div`
  width: calc(100% - 294px);
  border: 1px solid pink;
  vertical-align: top;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: scroll;
  transition: all 0;
`

class TableContainer extends React.Component {
  render() {
    return (
      <TableWrapper>
        <FiltersContainer />
        <Table>
          table
        </Table>
      </TableWrapper>
    )
  }
}

export default TableContainer
