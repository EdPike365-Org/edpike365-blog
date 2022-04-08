import React, { useContext } from "react"
import { NavContext } from "../../../contexts/NavContext"
import { Link } from "gatsby"
import { css } from "@emotion/react"
import LogoIconDiv from "./LogoIconDiv"
import LogoText from "./LogoText"
import { LogoDiv } from "./LogoDiv"

const logoLinkCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-main);
  text-decoration: none;
`
const LogoLink = () => {
  //TODO maybe i could move this state to LogoDiv
  const { runLogoAnimState } = useContext(NavContext)
  const [runLogoAnim] = runLogoAnimState

  return (
    <Link css={logoLinkCSS} to="/">
      <LogoDiv runLogoAnim={runLogoAnim}>
        <LogoIconDiv />
        <LogoText />
      </LogoDiv>
    </Link>
  )
}

export default LogoLink
