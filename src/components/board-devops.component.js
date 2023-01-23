import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardDevOps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        };
    }

    componentDidMount() {
        UserService.getDevOpsBoard().then(
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
    }


    render() {
        return (
            <div className="container">
                <header className="jumbotron">

                    <p>Kubernetes Dashboards</p>
                    <a href="https://10.100.101.109:30816/">on kuber01</a><br />
                    <a href="https://10.100.101.80:30816/">on kuber02</a><br />
                    <a href="https://preview-dev-dashboard.paradine.at/">on kuber03</a><br />
                    <a href="https://10.100.101.111:30816/">on eptosjboss07</a><br />
                    <a href="https://tmms-beta-dashboard.paradine.at/#/login">on basfkuber01</a><br />
                    <a href="https://nxp-aws-dashboard.paradine.at/#/login">on aws for nxp</a><br />
                    <a href="https://eclasscdp-aws-dashboard.paradine.at/">on aws for eclass</a><br />
                    <a href="https://tkdc-aws-dashboard.paradine.at/#/login">on aws for tk</a><br />
                    <a href="https://preview-aks-dashboard.paradine.at/#/login">on aws for preview</a><br />

                    <br /><br />
                    <p>kuber pods</p>
                    <p dangerouslySetInnerHTML={{ __html: this.state.content.replace(/\n/g, "<br />") }} />
                </header>
            </div >
        );
    }
}