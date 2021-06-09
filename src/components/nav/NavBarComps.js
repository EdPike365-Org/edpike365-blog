import React, { useContext } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { NavContext } from "../../contexts/NavContext"

export const Nav = styled.nav`
  grid-area: nav;

  ${props => (props.showNav ? "display: flex;" : "display:none;")} 
  flex-direction: column;

  overflow:auto;

  /*bottom: 100%;  by using 0% vs height 100%, we get no vert scroll bar */
  width: 100%;
  min-height: 100vh;

  font-weight: 600;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out; 
  background-color: var(--color-background-paper);
  /*box-shadow: var(--shape-box-shadow);*/

  @keyframes OPEN-RIGHT-100 {
    0% {
     
   }
    100% {
      
      transform: scaleX(1);
    }
  }

  /* Hide/Close me unless showNav is true */
  /*transform-origin: left;*/
  /* transition: width 800ms ease-in-out; */
  /* transform: ${props => (props.showNav ? "scaleX(1)" : "scaleX(0)")}; */
  /* ${props => (props.showNav ? "animation: OPEN-RIGHT-100 5s ease-out;" : "transform: scaleX(0);")} */
  
  /*-------------------- Decent Phones  --------------------*/
  /* Before this: no logo icon */
  @media only screen and (min-width: 320px) {
    /* transform: ${props => (props.showNav ? "scaleX(1)" : "scaleX(0)")}; */

    font-size: 1.5rem;
    font-weight: 700;
  }

  /*-------------------- Tablet  --------------------*/
  /* still hiding nav and showing hamburger button, but fonts are bigger
  Also, the top navheader is taller so navbar has to start lower down */
  @media only screen and (min-width: 700px) {
    width: 300px;
    min-width: 200px;
    height: auto;
    min-height: 100vh;

    font-size: 1.5rem;
    font-weight: 700;
  }

  /*-------------------- LapTop  --------------------*/
  /* show the nav bar open and fixed open on the left */
  @media only screen and (min-width: 1366px) {

    width: 300px;
    min-width: 300px;
    height: auto;
    min-height: 100vh;
    display:flex;
    /* ${props => (props.showNav ? "display: flex;" : "display:none;")}  */

    /* 
    Pro Tip: I had quotes on "flex" here and it would not work, but it did not tell me 
    because it is not "compiled". But for some reason, it *would* obey the props.showNav on first render, 
    I'm guessing because that was the last legit setting because it did NOT have the quotes 
    display: flex;
    */
  

    /* it was hidden off to the left, we have to bring it back, 
    setting display to flex is not doing it 
    transform: translateX(0); 
    */
    
 
    /* if the nav div is hidden (showNav is false) in tablet/mobile mode, 
      and we grow the screen to desktop mode, we have to overide the slow transition that opens the nav 
      or we get a white flash before the navbar fills the newly created nav void on the left side of the screen
      transition-duration: 0s;
      transition: transform 0ms; 
    */
     
    /* the color transition has to be down here or somehow the transform one overwrites it */
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
    
  }
`

export const NavUL = styled.ul`
  color: var(--color-primary-dark);
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const SubUL = styled.ul`
  list-style-type: none;
  letter-spacing: var(--font-letter-spacing-overline);
  padding: 0.5rem 1rem;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`

export const NavLI = styled.li`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`

/* this uses the props to className overrided functionality of Emotion */
const StyledLink = styled(props => <Link {...props} />)`
  color: var(--color-text-secondary);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out; 

  :hover {
    color: var(--color-text-primary);
    border-bottom: 2px solid var(--color-primary-dark);
  }

  /* preserve space for the active arrow with invisible arrow */
  ::after {
    white-space: pre;
    color: var(--color-background-paper);
    content: " >";
    display: none;
  }

  :active::after {
    color: var(--color-text-primary);
    content: " >";
    display: inline;
  }
`

export const NavLink = props => {
  const { showNavState } = useContext(NavContext)
  //showNavState is a useState. If you just deref "toggleShowNav", it will actually be pointing
  //at the boolean "showNav". If you deref both as [showNav, toggleShowNav], linter will give you warnings
  //SO, this is a workaround (React made useState as a workaround as well, hence the kludgy-ness)
  const toggleShowNav = showNavState[1]
  const handleClick = () => {
    //TODO: we need to allow the link to run *before* we close nav
    //HOWEVER: the perceived lag between toggleShowNav() closing the nav and the navigation taking effect
    //with page load, is only a problem in dev. In prod, the entire page reloads, which immediately
    //closes the nav (you can tell because the close animation does not run UNLESS you are the same page the link goes to)
    toggleShowNav()
  }

  return <StyledLink {...props} onClick={handleClick} />
}
