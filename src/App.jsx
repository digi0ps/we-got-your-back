import React from 'react'
import './App.css'
import Webcam from './Webcam'

class Home extends React.Component {
    render() {
        return (
            <div className="Main">
                { /* <Webcam /> */ }
                <div className="firstHalf">
                    <img src="/images/computer.svg" className="logo"/>
                </div>
                <div className="secondHalf">
                <span className="title">Ergonomics</span><br></br>
                <span className="tagline">Made Simple</span><br></br>
                <button className="button firstButton">Let's Go</button>
                </div>

                
            </div>
        )
    }
}

export default Home