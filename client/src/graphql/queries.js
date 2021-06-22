import gql from 'graphql-tag'


export const ME_QUERY = `
{
  me {
    _id
		name
		email
		picture
  }
}
`;