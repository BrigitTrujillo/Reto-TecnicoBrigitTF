import { gql } from '@apollo/client';

export const GET_CONTINENTS = gql`
  query {
    continents {
      name
    }
  }
`;

// GET_COUNTRIES query con el campo phone
export const GET_COUNTRIES = gql`
  query {
    countries {
      name
      capital
      continent {
        name
      }
      code
      phone
    }
  }
`;


