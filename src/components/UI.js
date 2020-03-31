import React, { Component } from 'react'
import axios from 'axios'
import Modal from './Modal';

class UI extends Component {
    state = {
        users: []
    }
    componentDidMount(){
        axios.get('http://localhost:3004/members')
        .then(res => {
            console.log(res.data);
            this.setState({
                users: res.data
            });
        })
    }
    

    render(){
        const { users } = this.state
        const userList = users.length ? (
            users.map(user => {
                return (
                <table style={{margin: '50px'}} className="responsive-table" key={user.id}>
                    <tbody>
                        <tr className="row">
                            <td className="col s12 m4 l4">{user.real_name}</td>
                            <td className="col s12 m4 l4">{user.tz}</td>
                            <td className="col s12 m4 l4"><Modal /></td>
                        </tr>
                    </tbody>
                </table>
                )
            })
        ) : (
        <div className="center">Loading Standby...</div>
        );

        return (
            <div>
                <div className="container">
                    <h4 className="center">List of Members</h4>
                    {userList}
                </div>
            </div>
        )
    }
}

export default UI