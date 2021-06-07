import React from "react"
import { css } from "@emotion/react"

//https://totalwar.fandom.com/wiki/Bessho_Clan
// https://mai-ko.com/travel/culture-in-japan/crests/japanese-family-crests-kamon-2/
// https://css-tricks.com/scale-svg/#:~:text=SVG%20images%2C%20in%20contrast%2C%20can,clearly%20defined%20height%20or%20width.&text=If%20you%20don't%2C%20SVG,HTML
// https://codepen.io/designcourse/live/mdydjBa
//https://wattenberger.com/guide/scaling-svg
//#9699B8
const LogoIcon = () => {
  return (
    <svg
      css={css`
        fill: var(--color-primary-dark);
        stroke: var(--color-primary-dark);
      `}
      viewBox="-10 -10 276 276"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(0.1, 0.1) ">
        <circle cx="1280" cy="1280" r="1320" strokeWidth="120" fill="none" />
        <path
          d="M1145 2349 c-446 -61 -794 -374 -912 -817 -23 -86 -26 -117 -26 -262
0 -146 3 -176 26 -263 70 -263 230 -491 443 -633 172 -115 347 -171 555 -181
200 -9 366 25 541 113 126 63 285 184 271 207 -3 6 -2 7 4 4 5 -3 26 11 45 31
167 176 278 464 278 722 0 153 -46 344 -116 483 -115 229 -336 434 -569 528
-161 64 -374 91 -540 68z m220 -40 c-150 -14 -293 -77 -386 -170 -139 -138
-163 -344 -64 -539 98 -193 359 -257 591 -145 102 50 193 172 210 282 4 28 11
43 21 43 8 0 52 -19 96 -42 147 -77 287 -233 351 -393 75 -188 75 -412 0 -601
-27 -69 -102 -195 -123 -208 -6 -4 2 13 19 38 124 183 153 442 69 608 -68 134
-246 232 -419 231 -111 0 -178 -29 -261 -112 -73 -74 -104 -131 -126 -235 -31
-147 3 -272 102 -373 l61 -63 -34 -27 c-50 -38 -154 -87 -242 -115 -64 -20
-96 -23 -220 -23 -124 0 -156 3 -220 23 -193 61 -347 175 -453 335 -21 31 -40
64 -44 74 -3 10 13 -10 36 -44 130 -192 350 -307 524 -275 138 26 283 135 344
259 25 53 28 68 28 163 0 97 -2 110 -32 172 -58 123 -194 231 -326 258 -62 13
-136 7 -200 -16 -22 -8 -43 -11 -48 -8 -15 9 -10 189 7 272 52 257 230 474
474 579 92 39 194 62 280 61 l65 -1 -80 -8z"
        />
      </g>
    </svg>
  )
}

export default LogoIcon
