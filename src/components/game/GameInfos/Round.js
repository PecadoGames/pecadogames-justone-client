import {withRouter} from "react-router-dom";
import React from "react";




class Round extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rounds: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.rounds !== state.rounds) {
            return {
                rounds: props.rounds,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <div>Round: {this.state.rounds}/13</div>

        )
    }
}
export default withRouter(Round);