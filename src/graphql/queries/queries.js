import { gql } from '@apollo/client';

export const FIND_BOOK = gql`
  query FindBook($suchkriterien: SuchkriterienInput) {
    buecher(suchkriterien: $suchkriterien) {
      id
      titel {
        titel
        untertitel
      }
      isbn
      preis
    }
  }
`;
