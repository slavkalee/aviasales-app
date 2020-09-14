import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  top: 20px;
  width: 30%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-right: 10px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #4a4a4a;
  padding: 20px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 13px 20px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: #d9f0f7;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  border: 1px solid blue;
`;

const Category = styled.div`
  font-size: 15px;
  color: #4a4a4a;
  margin-left: 10px;
`;

const Filters = memo(({ items, filterState, setFilter }) => {

  const handleChange = (checked, value) => {
    let newFilters = [...filterState];

    if (checked) {
      newFilters = newFilters.filter((f) => f !== value);
      if (!newFilters.length) {
        newFilters = [null];
      }
    } else {
      if (value === null) {
        newFilters = [null];
      } else {
        newFilters = newFilters.filter((f) => f !== null);
        newFilters.push(value);
      }
    }

    setFilter(newFilters);
  };

  return (
    <Container>
      <Title>Количество пересадок</Title>
      <List>
        {items.map((item, index) => {
          const checked = filterState.some((f) => f === item.value);
          return (
            <ListItem key={`__${index}`}>
              <Checkbox
                type="checkbox"
                checked={checked}
                onChange={() => handleChange(checked, item.value)}
              />
              <Category>{item.label}</Category>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
});

export default Filters;
