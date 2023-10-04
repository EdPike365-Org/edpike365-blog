import styled from "@emotion/styled"
import { css } from "@emotion/react"

export const FormDiv = styled.div`
  box-sizing: border-box;
  margin: 0 0;
  padding: 0;

  max-width: 100%;

  display: flex;
  flex-direction: column;

  background-color: var(--color-background-paper);
  border-radius: 5px;
  border: 1px solid var(--color-primary-main);
`

export const TitleRow = styled.div`
  display: flex;
  justify-content: center;
  width: 98%;
  padding: .5rem;

  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;  
`

export const ResponseRow = styled.div`
  display: none;
  justify-content: center;
  padding: 1rem;
  width: 98%;
  vertical-align: middle;
  text-align: center;
  visibility: hidden;
`

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%; 
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: .5rem;
  max-width: 100%;
  align-items: center;
  vertical-align: middle;

  & > label {
    vertical-align: middle;
    margin-right: 1rem;
    padding: 0 0;
    font-weight: bold;    
    max-width: 20rem;
  }

  & > input {
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid var(--color-text-secondary);
    min-width: 10rem;
    max-width: 100rem;
    max-height: 2rem;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  & > button[type=submit] {
    padding: 1rem;
    margin: .5rem;
    border: none;
    
    border-radius: 5px;
    font: inherit;
    font-weight: bold;

    background-color: var(--color-primary-main);

    &:hover {
      transform: translateX(-1px) translateY(-1px);
    }

  }
`

//TODO remove this code from buttongroup above
export const FormButton = styled.button`
  padding: 1rem;
  margin: .5rem;
  border: none;
  
  border-radius: 5px;
  font: inherit;
  font-weight: bold;

  background-color: var(--color-primary-main);

  &:hover {
    transform: translateX(-1px) translateY(-1px);
  }

`

// create hidden field p tag for bot-field
export const HiddenP = styled.p`
  display: none;
`

export const txtCSS = css({
  width: `30rem`,
})

