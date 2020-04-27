import styled from "styled-components";
import {withRouter} from "react-router-dom";
import React from "react";
import PickWord from "./PickWord";


const BackgroundContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 700px;
   width: 800px
    `

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: bottom;
   height: 350px;
   width: 400px
`

class LobbyPicture extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selectName !== state.selectName || props.selectName !== state.selectName ) {
            return {
                selectName: props.selectName,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    render(){
        return(
            <BackgroundContainer className = 'lobbyBackground'>
                <Container>
                </Container>
            </BackgroundContainer>
        )
    }
}
export default withRouter(LobbyPicture);
