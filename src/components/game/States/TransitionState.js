import {withRouter} from "react-router-dom";
import React from "react";




class TransitionState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectName: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.handleInputChange('selectName', this.props.selectName)
    }

    //when the props from parent changes this is called to change states
    static getDerivedStateFromProps(props, state) {
        if (props.selectName !== state.selectName) {
            return {
                selectName: props.selectName,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <div>
                <text>Transition</text>
            </div>

        )
    }
}
export default withRouter(TransitionState);