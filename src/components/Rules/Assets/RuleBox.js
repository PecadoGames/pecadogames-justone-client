import React from 'react';
import { render } from 'react-dom';
import { Element, Events } from 'react-scroll'
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {Button} from "../../../views/design/Button";




const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 150px
  margin-left: 230px
 
`;
const Text= styled.div`
  font-size: 20px;
  color: white
`;

const Title= styled.div`
  font-size: 40px;
  color: white
`;

const DownContainer=styled.button`
  position: absolute
  margin-top: 392px;
  margin-left: 132px;
  border: none 
  height: 48px;
  width: 42px;
  background: transparent
  
  
`
const UpContainer=styled.button`
  position: absolute
  margin-top: 390px;
  margin-left: 580px;
  border: none 
  height: 48px;
  width: 42px;
  background: transparent
  
`







class RuleBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            y: 25
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
            <Container>
                <Element name="chatBox" className="element" id="containerElement" style={{
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
                        <Text>After each round, your score will be calculated based on
                            how fast you provided clues and the guess. At the end of the game there
                            will be an overall game score, based on how good you performed.</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Setup:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>• Create a lobby and invite your friends!</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>• Start the Game. There have to be at least 3 players!</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Game flow:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Chose the mystery word</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>The active player draws the top card of the deck and
                            chooses one mystery word by clicking on one of the '???'.</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Clue selection:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Without communicating with each other and without
                            showing it to anyone each player writes one clue on
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
                        <Text>Invalid clues:</Text>
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
                        <Text> • A word from the same family as the Mystery word.
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
                        <Text>Comparing clues:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Once all players have written their clues, they also get to
                            vote on there clue if it's a valid clue or not. There are some further rules below! The NLP-Bot might
                            not catch them all, so vote wisely! A clue is dropped out if at least half of the persons
                            giving clues vote it to be invalid.
                            After this, the guessers will see all the valid clues provided.
                           </Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Identical clues:</Text>
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
                        <Text>Note: If all clues have been cancelled, place the Mystery
                            word’s card back in the box and move directly to the End
                            of turn phase.</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Guess:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Once the identical or invalid clues have been cancelled the guesser is allowed to send
                            ONLY ONE GUESS.</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Results:</Text>
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
                        <Text>End of Turn:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>A new randomly chosen player becomes the
                            new active player. A new turn begins.
                        </Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Variant For 3 players:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>With 3 players, the game plays out according to the standard rules as previous stated,
                            with the exception of the following change:
                            The clue givers can give two clues.
                            Identical clues are also cancelled during the comparison Phase of clue selection.</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>Score Calculation:</Text>
                    </Element>
                    <Element style={{marginTop: '10px'}}>
                        <Text>The faster you are, the better the score. If your clues gets erased, so do
                        your points for the respective round. The rest is our secret formula ;) Good luck! </Text>
                    </Element>
                </Element>
                <DownContainer onClick={() => {this.scrollDown()}}>
                </DownContainer>
                <UpContainer onClick={() => {this.scrollUp()}}>
                </UpContainer>
            </Container>

        );
    }
};

render(<RuleBox />, document.getElementById('root'));

export default withRouter(RuleBox)

