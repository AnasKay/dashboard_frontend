import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardInf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            items: [],
            vms: [],
            DataisLoaded: false,
            vmsLoaded: false
        };
    }

    authVsphere() {

    }

    componentDidMount() {
        UserService.getInfBoard().then(
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

        fetch(
            "https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })


        UserService.getAllVms().then(
            response2 => {
                this.setState(
                    { vms: response2.data }
                );
            }
        )
    }

    render() {
        const { DataisLoaded, items, vms } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div>;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>

                    <select name="vmlist" size="10">
                        {
                            vms.map((vm) => (
                                <option id={vm.name} class={vm.name}>{vm.name}</option>
                            ))
                        }
                    </select>


                </header >
            </div>

        );
    }
}