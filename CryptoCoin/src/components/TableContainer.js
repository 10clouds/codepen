import * as React from 'react';
import styled from 'styled-components';
import { ThemeContext } from './../theme-context';
import Table from './Table';

const TableWrapper = styled.div`
  width: calc(100% - 294px);
  border: 1px solid pink;
  vertical-align: top;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: scroll;
  transition: all 0;
`;

const Filters = styled.div`
  height: 206px;
  min-height: 206px;
  position: sticky;
  top: -100px;
  background: pink;
  opacity: .3;
`;

class TableContainer extends React.Component {

  render() {
    return (
      <TableWrapper>
        <Filters />
        <Table>
          table
        </Table>
      </TableWrapper>
    );
  }
}

export default TableContainer;

// ::-webkit-scrollbar              { /* 1 */ }
// ::-webkit-scrollbar-button       { /* 2 */ }
// ::-webkit-scrollbar-track        { /* 3 */ }
// ::-webkit-scrollbar-track-piece  { /* 4 */ }
// ::-webkit-scrollbar-thumb        { /* 5 */ }
// ::-webkit-scrollbar-corner       { /* 6 */ }
// ::-webkit-resizer