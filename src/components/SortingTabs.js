import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
`;

const List = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const ListItem = styled.li`
  width: 100%;
  padding: 15px 0;
  text-align: center;
  background: #ffffff;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #4a4a4a;
  border: 1px solid #dfe5ec;
  box-sizing: border-box;
  cursor: pointer;
  &.active {
    background: #2196f3;
    color: #ffffff;
    border: 1px solid #2196f3;
  }
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;



function SortingTabs({ tabSortState, setSort }) {
  return (
    <TabContainer>
      <List>
        <ListItem
          className={tabSortState && "active"}
          onClick={() => setSort(true)}
        >
          Самый дешёвый
        </ListItem>
        <ListItem
          className={!tabSortState && "active"}
          onClick={() => setSort(false)}
        >
          Самый быстрый
        </ListItem>
      </List>
    </TabContainer>
  );
}

export default SortingTabs;
