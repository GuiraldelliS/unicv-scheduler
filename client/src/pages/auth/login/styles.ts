import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
`

const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0rem 2rem;

  background: linear-gradient(
      208.59deg,
      rgba(0, 0, 0, 0.2) -19.38%,
      rgba(191, 255, 55, 0.2) 37.84%,
      rgba(170, 238, 24, 0.0480845) 89.46%,
      rgba(0, 0, 0, 0) 110.37%
    ),
    #4a5a3b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  min-height: 50vh;
`

const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 5rem 0;

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    font-family: 'Bruno Ace', cursive;
    margin: 0;
  }
`

export { Container, WrapperForm, WrapperTitle }
