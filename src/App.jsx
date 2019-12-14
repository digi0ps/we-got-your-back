import React from 'react'
import './App.css'
import Webcam from './Webcam'

class Home extends React.Component {
    render() {
        return (
            <div className="Main">
                { /* <Webcam /> */ }
                <div className="firstHalf">
                    <img src="/images/ergonomics-dribbble.jpg" className="logo"/>
                </div>
                
            </div>
        )
    }
}

export default Home