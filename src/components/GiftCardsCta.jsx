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
  return (
    <div className="columns is-multiline" style={{ justifyContent: "center" }}>
      <GiftCard image={images[0]} cardsLeft={cardsLeft[0]} title="$25 Gift Cards" cta={setModalActive}/>
      <GiftCard image={images[1]} cardsLeft={cardsLeft[1]} title="$50 Gift Cards" cta={setModalActive}/>
      <GiftCard image={images[2]} cardsLeft={cardsLeft[2]} title="$100 Gift Cards" cta={setModalActive} disabled/>
      {isModalActive && <ModalAnimation
        media={images[2].childImageSharp ? images[2].childImageSharp.fluid.src : images[2]}
        title={title}
        service={service} />}
    </div>
  )
}

export default GiftCardsCta
