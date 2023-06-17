import { gql } from '@apollo/client'

export const FIND_ALL_DEPARTAMENTS = gql`
  query ($pageableDTO: PageableDTOInput) {
    findAllDepartment(pageableDTO: $pageableDTO) {
      content {
        description
        id
      }
    }
  }
`
