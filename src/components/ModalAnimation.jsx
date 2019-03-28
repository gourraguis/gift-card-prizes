import React, { Component } from 'react'
import {
  PinterestShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,

  PinterestIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon
} from 'react-share'

const random = limit => Math.floor(Math.random() * limit)

const waitFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

const generateKey = blocks => {
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const result = []

  for (let i = 0; i < blocks; i++) {
    result[i] = ''
    for (let j = 0; j < 4; j++) {
      result[i] += dictionary[random(36)]
    }
  }

  return result.join('-')
}

class ModalAnimation extends Component {
  state = {
    step: 1,
    progressValue: 0,
    textSuccess: null,
    headerText: null,
    footerText: null,
    generatedKey: null,
    socialNetwork: null
  }

  componentDidMount = async () => {
    this.firstStep()
  }

  firstStep = async () => {
    const { service } = this.props

    this.setState({ headerText: 'Step 1: Establishing Connection'})

    const progressInterval = setInterval(() => {
      this.setState(prevState => ({ progressValue: prevState.progressValue + .1275}))
    }, 15)

    const serviceIp = `${random(255)}.${random(255)}.${random(255)}.${random(255)}`
    const port = random(900)
    const firstStageSteps = [
      `Connecting to ${service} server...`,
      `Server is up at ${serviceIp}:${port} (latency ${(Math.random() * 0.1).toFixed(2)}s)`,
      `Connecting to distributed server database...`,
      `Obtaining a service manager handle...`,
      `Creating a new service through pipeline...`,
      `Closing the secure service handle...`,
      `Sending stage (${random(100000)} bytes) to ${serviceIp}`,
      `Meterpreter session ${random(10)} opened at port ${port}`,
      `Connected to ${service} server...`
    ]
    for (let i = 0; i < firstStageSteps.length - 1; i++) {
      this.setState({ footerText: firstStageSteps[i] })
      await waitFor(random(1000) + 1000)
    }
    clearInterval(progressInterval)
    this.setState({
      progressValue: 100,
      footerText: firstStageSteps[firstStageSteps.length - 1],
      textSuccess: true
    })
    await waitFor(1500)

    this.secondStep()
  }

  secondStep = async () => {
    this.setState({
      step: 2,
      textSuccess: false,
      headerText: 'Step 2: Generating',
      footerText: 'Searching database for unused codes'
    })

    for (let i = 0; i < 115; i++) {
      this.setState({ generatedKey: generateKey(4) })
      await waitFor(50)
    }

    this.setState({
      generatedKey: generateKey(3) + '-XXX',
      textSuccess: true,
      headerText: 'Unused Code Found',
      footerText: 'The meterpreter return a positive working code'
    })

    await waitFor(2500)
    this.thirdStep()
  }

  thirdStep = async () => {
    const { service } = this.props

    this.setState({
      step: 3,
      textSuccess: false,
      headerText: `Your ${service} Gift Card Ready`,
      footerText: 'Share us with your friends on one of the social media above, then you get your card special code'
    })
  }

  chooseNetwork = socialNetwork => () => {
    this.setState({
      socialNetwork
    })
  }

  closeSharing = () => {
    this.forthStep()
  }

  forthStep = async () => {
    const { service } = this.props

    this.setState({
      step: 4,
      textSuccess: false,
      headerText: `Step 3: Receive Gift Card`,
      footerText: `Your ${service} Gift Card is ready`
    })
  }

  render() {
    const { step, progressValue, textSuccess, footerText, headerText, generatedKey, socialNetwork } = this.state
    const { service, title, media } = this.props
    const currentUrl = String(window.location)

    return (
      <div className='modal is-active'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title has-text-centered has-text-weight-bold is-uppercase is-size-6-mobile'>
              {headerText}
            </p>
          </header>
          <section className='modal-card-body'>
            {step === 1 ?
              (
                <progress className={`progress ${textSuccess ? 'is-success' : 'is-primary'}`} value={progressValue} max={100}>
                  {progressValue}%
                </progress>
              ) :
              (
                step === 2 ?
                  (
                    <pre className={`is-size-4 is-size-5-mobile has-text-centered has-text-weight-bold has-text-white ${textSuccess ? 'has-background-success' : 'has-background-primary'}`}>
                      {generatedKey}
                    </pre>
                  ) :
                  (
                    step === 3 ?
                      (
                        socialNetwork ?
                          (
                            <div className='has-background-primary'>
                              <p className='content has-text-centered is-large is-capitalized has-text-white' style={{ marginBottom: 0, paddingBottom: 0 }}>
                                Waiting for you to share on {socialNetwork}
                              </p>
                              <button className='button is-loading is-large is-fullwidth is-primary' style={{ borderRadius: 20 }} />
                            </div>
                          ) :
                          (
                            <div className='columns is-mobile is-multiline'>
                              <div className='column'>
                                <TwitterShareButton
                                  url={currentUrl}
                                  title={title}
                                  className='social-network-button'
                                  beforeOnClick={this.chooseNetwork('Twitter')}
                                  onShareWindowClose={this.closeSharing}
                                >
                                  <TwitterIcon size={56} />
                                </TwitterShareButton>
                              </div>
                              <div className='column'>
                                <PinterestShareButton
                                  url={currentUrl}
                                  media={media}
                                  windowWidth={1000}
                                  windowHeight={730}
                                  className='social-network-button'
                                  beforeOnClick={this.chooseNetwork('Pinterest')}
                                  onShareWindowClose={this.closeSharing}
                                >
                                  <PinterestIcon size={56} />
                                </PinterestShareButton>
                              </div>
                              <div className='column'>
                                <VKShareButton
                                  url={currentUrl}
                                  image={media}
                                  windowWidth={660}
                                  windowHeight={460}
                                  className='social-network-button'
                                  beforeOnClick={this.chooseNetwork('VK')}
                                  onShareWindowClose={this.closeSharing}
                                >
                                  <VKIcon size={56} />
                                </VKShareButton>
                              </div>
                              <div className='column'>
                                <WhatsappShareButton
                                  url={currentUrl}
                                  title={title}
                                  separator=':: '
                                  className='social-network-button'
                                  beforeOnClick={this.chooseNetwork('Whatsapp')}
                                  onShareWindowClose={this.closeSharing}
                                >
                                  <WhatsappIcon size={56} />
                                </WhatsappShareButton>
                              </div>
                              <div className='column'>
                                <button
                                  onClick={this.closeSharing}
                                  className='button is-large is-primary' style={{ borderRadius: 0 }}
                                >
                                  Skip
                                </button>
                              </div>
                            </div>
                          )
                      ) :
                      (
                        <div className='content has-text-centered'>
                          <p className='has-text-centered'>Thank you for sharing, it is much appreciated. We've found a {service} Gift Card for you, When you click the button below you might have to complete a captcha, then you will have to complete one offer.</p>
                          <p className='has-text-centered has-text-weight-bold'>Hosting our web app with so many visitors is expensive (and we're not rich &#9785;), that is why we use advertising to cover technical costs. It's not like we love doing this, but we have to.</p>
                          <a href='http://cpabuild.com/public/locker.php?it=493526&key=f723d' className='button is-warning is-large is-fullwidth is-inverted'>Alright, let's do this </a>
                        </div>
                      )
                  )
              )}
          </section>
          <footer className='modal-card-foot content'>
            <p className={`is-large has-text-centered ${textSuccess ? 'has-text-success' : ''}`} style={{ margin: 'auto' }}>
              {footerText}
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default ModalAnimation