import { gql } from '@apollo/client';

export const readCategories = (client) => client.query({
  query: gql`
      query ReadCategories {
        categories {
          name
        }
      }
    `,
});

export const readCategory = (client, categoryName) => client.query({
  query: gql`
  query ReadCategory {
    category(input: { title: "${categoryName}" }) {
      name,
      products {
        id,
        name,
        brand,
        inStock,
        gallery,
        attributes {
          id,
          items {
            id
          }
        },
        prices {
          currency{
            label,
            symbol
          },
          amount
        }
      }
    }
  }`,
});

export const readProduct = (client, productId) => client.query({
  query: gql`
  query ReadProduct {
    product(id: "${productId}") {
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes {
        id,
        name,
        type,
        items {
          displayValue,
          value,
          id
        }
      },
      prices {
        currency {
          label,
          symbol,
        },
        amount,
      },
      brand
    }
  }`,
});

export const readCurrencies = (client) => client.query({
  query: gql`
    query ReadCurrencies {
      currencies {
        label,
        symbol
      }
    }`,
});
