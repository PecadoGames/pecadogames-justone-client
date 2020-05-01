import {withRouter} from "react-router-dom";
import React from "react";




class EnterGuessState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clues: []
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('clues', this.props.clues)
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.clues !== state.clues) {
            return {
                clues: props.clues,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <div>{this.state.clues.map(clue => {
                return (<div>clue</div>)})}
                <text>EnterGuess</text>
            </div>



        )
    }
}
export default withRouter(EnterGuessState);