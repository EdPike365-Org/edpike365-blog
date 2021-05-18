import React from "react"
import styled from "@emotion/styled"

export const SideBarDiv = styled.div`
    background-color: var(--color-background-paper);
    box-shadow: var(--shape-box-shadow);
    padding: 1rem;

    grid-area: sidebar;
`

const SideBar = () => {

    return(
        <SideBarDiv>
        SideBarDiv: Under Construction
            <br/>
            Calendar, Ads, etc

        </SideBarDiv>
    )

}

export default SideBar
