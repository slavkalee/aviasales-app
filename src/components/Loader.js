import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
    margin: 50px 0 0 100px;
    width: 40px;
    height: 40px;
`;

export const Loader = () => (
    <LoaderContainer className="spinner-border text-primary" role="status" spinner-border-lg>
        <span className="sr-only">Loading...</span>
      </LoaderContainer>
      
)