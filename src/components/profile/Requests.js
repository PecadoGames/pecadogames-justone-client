import React from 'react';
import {withRouter} from 'react-router-dom';
import {BackgroundContainer} from "../main/Main";
import {WindowHeader, PhoneContainer, PixelButton, ButtonRow, ProfileContainer} from "./Assets/profileAssets";
import RequestBox from "./Assets/RequestBox";
import InviteLobbyPhone from "../lobby/InviteLobbyPhone";

class Requests extends React.Component {
    constructor() {
        super();
        this.state = {
            friendsRequest: [],
            phone: null
        };
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        this.props.changeMusicToNormal()
        this.state.id = this.props.match.params.id;
        this.lobby()

    }

    lobby(){
        this.state.phone = setInterval(async()=>{if(localStorage.getItem('lobbyId')){
            this.props.changeTalkingToOff();this.props.history.push('/game');}
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.phone)
    }

    render() {
        return (
            <BackgroundContainer className={"backgroundMain"}>
                <PhoneContainer className={"phoneProfile"}>
                    <WindowHeader>
                    ..\Profile\Requests.js
                    </WindowHeader>
                    <ProfileContainer>
                        <RequestBox/>
                            <ButtonRow>
                                <PixelButton
                                    width="200px"
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                >
                                    Back
                                </PixelButton>
                            </ButtonRow>
                    </ProfileContainer>
                </PhoneContainer>
                <InviteLobbyPhone changePhoneToOff={this.props.changePhoneToOff}
                                  changePhoneToOn={this.props.changePhoneToOn}
                                  changeTalkingToOff={this.props.changeTalkingToOff}
                                  changeTalkingToOn={this.props.changeTalkingToOn}
                >
                </InviteLobbyPhone>
            </BackgroundContainer>
        );
    }
}

export default withRouter(Requests);
