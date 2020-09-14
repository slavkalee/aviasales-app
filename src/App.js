import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

import Filters from "./components/Filters";
import TicketList from "./components/TicketList";

import img from "./assets/img/Logo.svg";
import SortingTabs from "./components/SortingTabs";

const Wrapper = styled.div`
  background: #d9e4ec;
  width: 100%;
  height: ${(props) => (props.height ? '100%' : '100vh')};
`;

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 50px 0 120px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const Logo = styled.img``;

const BodyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TicketContainer = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const filtersData = [
  {
    label: "Все",
    value: null,
  },
  {
    label: "Без пересадок",
    value: 0,
  },
  {
    label: "1 пересадка",
    value: 1,
  },
  {
    label: "2 пересадки",
    value: 2,
  },
  {
    label: "3 пересадки",
    value: 3,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState(null);
  const [isCheap, setCheap] = useState(true);
  const [filters, setFilter] = useState([null]);

  useEffect(() => {
    axios
      .get("https://front-test.beta.aviasales.ru/search")
      .then((response) => {
        setSearchId(response.data.searchId);
      });
  }, []);

  useEffect(() => {
    searchId && getTickets();
  }, [searchId]);

  const getTickets = useCallback(() => {
    axios
      .get("https://front-test.beta.aviasales.ru/tickets", {
        params: { searchId },
      })
      .then((response) => {
        setData(response.data.tickets.slice(0, 20));
      });
  }, [searchId]);

  function getDurationSum(ticket) {
    return ticket.segments.reduce((acc, segment) => {
      acc += +segment.duration;
      return acc;
    }, 0);
  }

  const sortedData = useMemo(() => {
    return data
      .filter((item) => {
        const transplantCount1 = item.segments[0].stops.length;
        const transplantCount2 = item.segments[1].stops.length;
        return filters.some((f) => {
          if (f === null) {
            return true;
          }
          return f === transplantCount1 || f === transplantCount2;
        });
      })
      .sort((a, b) => {
        if (isCheap) {
          return a.price - b.price;
        } else {
          return getDurationSum(a) - getDurationSum(b);
        }
      });
  }, [data, isCheap, filters]);

  return (
    <Wrapper height={data.length}>
      <Container>
        <LogoContainer>
          <Logo src={img} />
        </LogoContainer>
        <BodyContainer>
          <Filters
            items={filtersData}
            filterState={filters}
            setFilter={setFilter}
          />
          <TicketContainer>
            <SortingTabs tabSortState={isCheap} setSort={setCheap} />
            <TicketList data={sortedData} />
          </TicketContainer>
        </BodyContainer>
      </Container>
    </Wrapper>
  );
}

export default App;
