import React from "react";
import styled from "styled-components";

import img from "../assets/img/logo2.svg";
import {
  getTimeFromMins,
  getHourString,
  getMinuteString,
  minutesToTime,
  desc,
} from "../utils";
import { Loader } from "./Loader";

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 20px 0;
  padding: 20px 0px 30px 20px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 65px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: #2196f3;
`;

const Carrier = styled.div``;

const Img = styled.img``;

const CardBody = styled.div``;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:first-child {
    margin-bottom: 30px;
  }
`;

const Col = styled.div`
  flex: 0 1 33%;
`;

const Desc = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #a0b0b9;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Text = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #4a4a4a;
`;


const TicketList = ({ data }) => {
  const getTimeString = (date) => {
    return `${getHourString(date)}:${getMinuteString(date)}`;
  };

  if (!data.length) {
    return <Loader />;
  }

  return (
    <>
      {data.map(({ price, segments }) => (
        <Container key={`key_${price}`}>
          <CardHeader>
            <Price>{price} Р </Price>
            <Carrier>
              <Img src={img} />
            </Carrier>
          </CardHeader>

          <CardBody>
            {segments.map(({ origin, destination, date, duration, stops }) => (
              <CardRow key={`origin_${origin}`}>
                <Col>
                  <Desc>
                    {origin} - {destination}
                  </Desc>
                  <Text>{`${getTimeString(date)} - ${minutesToTime(
                    date,
                    duration
                  )}`}</Text>
                </Col>
                <Col>
                  <Desc>В пути</Desc>
                  <Text>{getTimeFromMins(duration)}</Text>
                </Col>
                <Col>
                  <Desc>{desc(stops)}</Desc>
                  <Text>{stops.join(", ")}</Text>
                </Col>
              </CardRow>
            ))}
          </CardBody>
        </Container>
      ))}
    </>
  );
};

export default TicketList;
