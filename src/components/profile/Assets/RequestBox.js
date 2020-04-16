import React from 'react';
import { render } from 'react-dom';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";



class RequestBox extends React.Component {

    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.state = {
            requests: []
        }
    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

    }
    scrollToTop() {
        scroll.scrollToTop();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
            <div>
                <Element name="RequestBox" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '300px',
                    overflow: 'scroll',
                }}>
                    {/* start of messages */}
                    {this.state.requests.map(users => {return(
                        <Element key = {users.Id} name={users.user}>
                            message
                        </Element>);
                    })}
                    {/* end of messages */}

                    {/* Examples start */}
                    <Element name="message" style={{
                        marginBottom: '300px'
                    }}>
                        first element inside container
                    </Element>
                    <Element name="message2" style={{

                    }}>
                        second element inside container
                    </Element>
                    {/* Examples end */}

                </Element>

            </div>
        );
    }
};

render(<RequestBox />, document.getElementById('root'));

export default withRouter(RequestBox)

