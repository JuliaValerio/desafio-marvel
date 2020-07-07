import React, { Component } from 'react'
import api from '../../services/Api'
import './index.css'

export default class Details extends Component {
    state = {
        user: {},
    }

    async componentDidMount(){

        const { id } = this.props.match.params;
        // const refactoryName = name.replace(' ','-')
        const PUBLIC_KEY  = '3bf8546bf8bb84b91db994cf4bc4e511'
        const response = await api.get(`characters/${id}?apikey=${PUBLIC_KEY}`)
        this.setState({ user: response.data})
        console.log("teste", this.state.user)
    }
    
    render() {
        return(
            <div className="user-card">
                <div className="user-profile">
                    <h1>Detalhes</h1>

                    <h1>Fasciculos</h1>
                </div>
            </div>    
        )
    }
}