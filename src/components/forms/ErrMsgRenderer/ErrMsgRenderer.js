import React from 'react'
import * as styles from './ErrMsgRenderer.module.css'

const ErrMsgRenderer = message => {
  return <div className={styles.errMsgDiv}>{message}&nbsp;&nbsp;</div>
}

export default ErrMsgRenderer
