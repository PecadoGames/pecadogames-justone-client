import {withRouter} from "react-router-dom";
import React from "react";




class Score extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            score: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.score !== state.score) {
            return {
                score: props.score,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <div>Game Score: {this.state.score}</div>

        )
    }
}
export default withRouter(Score);