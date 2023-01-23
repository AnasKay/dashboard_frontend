import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardOps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            vms: []
        };
    }

    componentDidMount() {
        UserService.getOpsBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        UserService.getAllVms().then(
            response2 => {
                this.setState(
                    { vms: response2.data }
                );
            }
        )
    }


    render() {
        const { vms } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <p>Server list</p>
                    <p dangerouslySetInnerHTML={{ __html: this.state.content.replace(/\n/g, "<br />") }} />

                    <select name="vmlist" size="10">
                        {
                            vms.map((vm) => (
                                <option id={vm.name} class={vm.name}>{vm.name}</option>
                            ))
                        }
                    </select>

                </header>



            </div>
        );
    }
}