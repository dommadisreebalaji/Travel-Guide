import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {data: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.setState({apiStatus: apiConstants.progress}, this.getData)
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({data: data.packages, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <ul className="places-list-container">
        {data.map(each => (
          <li key={each.id} className="list-item">
            <img src={each.image_url} alt={each.name} className="place-image" />
            <h4 className="place-name">{each.name}</h4>
            <p className="place-description">{each.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderAppView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()

      default:
        return this.renderLoaderView()
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-heading">Travel Guide</h1>
        {this.renderAppView()}
      </div>
    )
  }
}

export default TravelGuide
