import React, { Component } from 'react'
import logo from './eth-logo-black.svg'
import './App.css'
import { MetaMaskButton, Link, Image, Icon } from 'rimble-ui'
import { Heading, Text, Modal, Flex, Box, Loader, Card } from "rimble-ui"
import ConnectionBanner from '@rimble/connection-banner'
import connector from './lib/connect'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            account: null,
            hasProvider: false,
        }
    }


    async componentDidMount() {
        try {
            const [api, ok] = await connector().connect()

            this.setState({hasProvider: ok})

            if (! ok) {
                // if we don't have a provider (MetaMask), we have a banner
                // showing in the header to direct users to download MetaMask
                return
            }

            // account event listeners
            {
                api.onAccountsChanged = async account => {
                    this.setState({account: account || null})

                    if (! account) {
                        return
                    }

                    this.registerEventListeners(account)
                }
            }

            this.api = api

            // since we have a provider, we'll see if we
            // already have an account connected
            {
                const accounts = await this.api.ethers.listAccounts()

                if (accounts.length > 0) {
                    this.setState({account: accounts[0]})

                    this.registerEventListeners(accounts[0])
                }
            }

        } catch(err) {
            console.error(err)
        }

    }

    registerEventListeners = account => {
        // this.api.UserRatings.on("UserRated", async (rater, ratee, rating) => {
        // })
    }

    dappConnect = async () => {

        // TODO: implement wallet connect
        if (! this.state.hasProvider) {
            window.alert('Please install MetaMask')
            return
        }

        const [account] = await window.ethereum.request({ method: "eth_requestAccounts" })

        if (! account) {
            return
        }

        this.setState({account})
    }


    render() {

        const connect = this.state.account
            ? <div className="App-account">{this.state.account}</div>
            : <MetaMaskButton.Outline onClick={this.dappConnect}>Connect with MetaMask</MetaMaskButton.Outline>

        return (
            <div className="App">
                <div className={"App-metamaskBanner " + (this.state.hasProvider ? 'hide' : 'show')}>
                    <ConnectionBanner
                        onWeb3Fallback={true}
                    />
                </div>
                <header className="App-header">
                    <nav className="App-nav">
                        <div className="App-nav_left">
                            <div className="App-logoWrap">
                                <a className="" href="/">
                                    <img src={logo} className="App-logo" alt="logo" />
                                </a>
                            </div>
                            <div className="App-siteTitle">
                                <a className="" href="/">DApp Starter</a>
                            </div>
                        </div>
                        <div className="App-nav_right">
                            {connect}
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default App;
