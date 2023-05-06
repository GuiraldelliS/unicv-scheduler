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
  flex-direction: column;
  justify-content: flex-start;

  padding: 0rem 1rem 3rem 1rem;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 47px;
    color: #2e3e4b;
    margin: 0;
  }

  h5 {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: #2e3e4b;
    margin: 0;
  }
`

const ContainerActions = styled.div`
  padding: 2rem 1rem;

  svg {
    cursor: pointer;
  }
`
export { Container, WrapperForm, WrapperTitle, ContainerActions }
