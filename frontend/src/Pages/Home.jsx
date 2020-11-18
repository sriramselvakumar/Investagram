import React from 'react'
import Navbar from '../Components/Navbar'
import commonStyles from '../Styles/CommonStyles'
import {CardDeck,Card} from "react-bootstrap";

const styles = {
    header: {
        textAlign: 'center',
        padding: '5%'
    },
    cardDeck: {
      width: '80%',
        marginLeft: '10%'
    },
    cardTitle:{
      textAlign:'center',
    }
}

const Home = () => {
    const {background} = commonStyles
    const {header,cardDeck,cardTitle} = styles
    return (
        <React.Fragment>
            <Navbar showLogin = {true} showRegister = {true} />
            <div style={background}>
                <h1 style = {header}>Investagram</h1>
                <CardDeck style = {cardDeck}>
                    < Card bg = 'secondary'>
                        <Card.Body>
                            <Card.Title style = {cardTitle}>Get Tips and Tricks From Other Investors</Card.Title>
                            <Card.Text>
                                What if you knew you could get tips and tricks from the best investors out there?
                                That's what Investagram is there for :). Head out to the feed section and change how you invest!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg = 'secondary'>
                        <Card.Body>
                            <Card.Title style = {cardTitle}>Post about your investment strategy</Card.Title>
                            <Card.Text>
                                Investagram gives you the power to influence other investors out there
                                by sharing the tips that you have learnt along the way of your investment career
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg = 'secondary'>
                        <Card.Body>
                            <Card.Title style = {cardTitle}>Stay up to date with the Stock Market</Card.Title>
                            <Card.Text>
                                Investagram allows you to stay updated with the latest news on the market.
                                Head over to the feed once you register or login as an investor!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        </React.Fragment>
    )
}
export default Home