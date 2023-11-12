import React from 'react'
import * as styles from './LoaderSpinner.module.css'
import ModalOverlay from '../ModalOverlay'
import { CirclesWithBar as Spinner } from 'react-loader-spinner'

const LoaderSpinner = props => {
  return (
    <ModalOverlay>
      <div className={styles.spinnerWrapperDiv}>
        <Spinner
          color="rgb(121, 134, 203)"
          width="275"
          height="350"
          ariaLabel={props.message}
        />
        <span className={styles.spinnerMessageSpan}>{props.message}</span>
      </div>
    </ModalOverlay>
  )
}

export default LoaderSpinner
