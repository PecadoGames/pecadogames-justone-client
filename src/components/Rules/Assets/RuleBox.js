import React from 'react';
import { render } from 'react-dom';
import { Element, Events } from 'react-scroll'
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {NeonButton} from "../../scoreboard/Scoreboard";




const ScreenContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 350px;
`;

const Text= styled.div`
  font-size: 20px;
  color: white
`;

const Title= styled.div`
  font-size: 40px;
  color: white
`;

const Subtitle = styled.div`
    font-size: 30px;
    color: white
`;

const RuleBoxWrapper = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 180px;
    margin-left: 225px;
    align-items: center;
`;

const ArcadeButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%
    height: 145px;
`;

const DownContainer=styled.button`
  display: flex;
  margin-top: 40px;
  margin-left: 135px;
  height: 55px;
  width: 48px;
  background: transparent;
  border: none;
`;

const ExitButtonContainer=styled.div`
    margin-top: 95px;
    margin-left: 145px;
    height: 50px;
    width: auto;
`

const UpContainer=styled.button`
  display: flex;
  margin-top: 40px;
  margin-left: 153px;
  height: 55px;
  width: 48px;
  background: transparent;
  border: none;
`;






class RuleBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            y: 60
        }
    }

    async componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        //ask ever second for chat


    }




    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');

    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    scrollDown(){
        //gets chatbox
        const element = document.getElementById("containerElement")
        //gets height
        if (element){
            element.scrollBy(0, this.state.y)
            }
    }

    scrollUp(){
        //gets chatbox
        const element = document.getElementById("containerElement")
        //gets height
        if (element){
            element.scrollBy(0, -this.state.y)
        }
    }

    render() {
        return (
            <RuleBoxWrapper>
                <ScreenContainer>
                    <Element name="chatBox" className="rules" id="containerElement" style={{
                        display: 'block',
                        position: 'relative',
                        height: '350px',
                        overflow: 'auto',
                        width: '747px'
                    }}>
                        <Element style={{marginTop: '10px'}}>
                            <Title>Just One - Rules</Title>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text> Hello and welcome! Just One is a cooperative party game.
                                All players play together to get the best score!</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Together, make a randomly chosen player – the active player –
                                guess a Mystery word by secretly writing a clue.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Choose your clue without coordinating with each other
                                and be original so as not to write the same clue as another
                                player, as all identical clues will be canceled before
                                the active player gets to see them.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Setup:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• Create a lobby, therefore you have to choose the number of rounds you want to play
                                and what the name of your lobby is. You can also invite your friends into the lobby!</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• Start the Game. There have to be at least 3 players! You can also add friendly bots!</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Game flow:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Choose the mystery word</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>The active player draws the top card of the deck and
                                chooses one mystery word by clicking on one of the '???'.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Clue selection:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Without communicating with each other, each player writes one clue into
                                their field. That clue must be composed of a single word.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Note: a digit, a number, an acronym, an onomatopoeia, or
                                a special character are all considered to be words.
                                Example: 007 is allowed to help someone guess Bond, just
                                like Riiiiiinnng or SMS are allowed to help someone guess
                                Telephone, and $ is allowed to help someone guess America.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Invalid clues:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• The Mystery word but written differently.
                                Example: Shurt is not allowed when trying to make the
                                player guess Shirt.
                            </Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• The Mystery word written in a foreign language.
                                Example: Buisson is not allowed if the word to be guessed
                                is Shrub.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• A word from the same family as the Mystery word.
                                Example: Princess is not allowed if the word to be guessed
                                is Prince.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• An invented word.
                                Example: Swee’ting is not allowed to try to help someone
                                guess Cake.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• A word phonetically identical to the Mystery word, but
                                the meaning of which is different.
                                Example: Whether is not allowed to try to get someone to
                                guess Weather.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Comparing clues:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Once all players have written their clues, they also get to
                                vote on all entered clue to decide if they're valid clues or not. There are some further rules right below! The NLP-Bot might
                                not catch them all, so vote wisely! A clue is deleted from the list of clues if at least half of the players
                                giving clues vote it to be invalid.
                                Afterwards, the guessers will see all the valid clues that are left.
                            </Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>The following are considered identical clues:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• Two identical words.
                                Example: Mouse and Mouse are identical.
                            </Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• Variants from the same word family.
                                Example: Prince and Princess are considered to be identical.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>• Variants of the same word: plurals, gender differentiations,
                                and spelling mistakes don’t count as actual differences.
                                Example: Prince and Princes, Actor and Actress, Philosophy
                                and Filosofie are identical.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Guess:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Once the identical or invalid clues have been cancelled the guesser is allowed to send
                                only one guess!</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Results:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>Success:
                                If the active player correctly guesses the Mystery
                                word.
                            </Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text> Failure:
                                If the active player makes a wrong guess.</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>End of round:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>A new randomly chosen player becomes the
                                new active player. A new round begins.
                            </Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Variant For 3 players:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>With 3 players, the game plays out according to the standard rules as previously stated,
                                with the following exception:
                                The clue givers can give two clues.
                                Identical clues are also deleted in this game mode!</Text>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Subtitle>Score Calculation:</Subtitle>
                        </Element>
                        <Element style={{marginTop: '10px'}}>
                            <Text>The faster you are, the better the score. If your clues gets erased, so do
                            your points for the respective round. Of course, whether the active player guessed
                                right or not has an impact on all of the scores as well. The rest is our secret formula ;) Good luck! </Text>
                        </Element>
                    </Element>
                </ScreenContainer>
                <ArcadeButtonContainer>
                    <DownContainer 
                        onClick={() => { 
                            this.scrollDown()
                            this.props.changeArcadeToOn()
                        }}/>
                    <ExitButtonContainer>
                        <NeonButton
                            outline="white"
                            color="white"
                            hoverColor="white"
                            hoverBackground="#800000"
                            background="red"
                            boxShadow="0 0 50px red"
                            hoverBoxShadow="none"
                            onClick={() => {this.props.history.push(`main`)}}>
                            Exit
                        </NeonButton>
                    </ExitButtonContainer>
                    <UpContainer 
                    onClick={() => { 
                        this.scrollUp()
                        this.props.changeArcadeToOn()
                    }}/>
                </ArcadeButtonContainer>
            </RuleBoxWrapper>
        );
    }
}

render(<RuleBox />, document.getElementById('root'));

export default withRouter(RuleBox)

