import React, { useState, useEffect } from "react"

import ModalAnimation from './ModalAnimation'

const GiftCard = ({ image, title, cardsLeft, cta, disabled }) => (
  <div className='column is-narrow' onClick={() => cta(true)}>
    <figure className={`image gift-card ${disabled ? 'gift-card-disabled' : ''}`}>
      <img
        src={image.childImageSharp ? image.childImageSharp.fluid.src : image}
        alt={title}
      />
    </figure>
    <button className={`button is-fullwidth ${disabled ? 'gift-card-disabled is-primary' : 'is-success'}`} style={{ maxWidth: 300, margin: 'auto' }}>
      {cardsLeft}
    </button>
  </div>
)

const GiftCardsCta = ({ images, title, service }) => {
  const [seconds, setSeconds] = useState(86400 - Math.floor((Date.now() % 86400000) / 1000))
  const [isModalActive, setModalActive] = useState(false)

  useEffect(() => {
    setInterval(() => setSeconds(86400 - Math.floor((Date.now() % 86400000) / 1000)), 500)
  })

  const cardsLeft = [
    `${Math.floor(seconds * .55)} Left`,
    `${Math.floor(seconds * .34)} Left`,
    `Sorry, 0 left`
  ]
  const titles = [
    '$25 Gift Cards',
    '$50 Gift Cards',
    '$100 Gift Cards'
  ]

  return (
    <div className="columns is-multiline" style={{ justifyContent: "center" }}>
      {[1, 2, 3].map(i => (
        <GiftCard image={images[i]} cardsLeft={cardsLeft[i]} title={titles[i]} cta={setModalActive} disabled={i === 3}/>
      ))}
      {isModalActive && <ModalAnimation
        media={images[2].childImageSharp ? images[2].childImageSharp.fluid.src : images[2]}
        title={title}
        service={service} />}
    </div>
  )
}

export default GiftCardsCta
