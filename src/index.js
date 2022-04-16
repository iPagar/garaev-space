import ReactDOM from 'react-dom'
import React from 'react'
import './styles.css'
import App from './App'
import Github from './images/Github.png'
import { ReactComponent as Linkedin } from './images/Linkedin.svg'
import { ReactComponent as Telegram } from './images/Telegram.svg'
import styles from './index.module.css'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div className={styles.logosContainer}>
        <a href="https://github.com/iPagar" target="_blank">
          <img src={Github} className={styles.logo} />
        </a>
        <a href="https://linkedin.com/in/iPagar" target="_blank">
          <Linkedin className={styles.logo} />
        </a>
        <a href="https://t.me/iPagar" target="_blank">
          <Telegram className={styles.logo} />
        </a>
      </div>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>creative —</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>{new Date().getFullYear()}</div>
    </div>
  )
}

ReactDOM.render(
  <>
    <App />
    <Overlay />
  </>,
  document.getElementById('root')
)
