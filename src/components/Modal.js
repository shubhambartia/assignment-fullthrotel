import React, { Component } from "react";
import M from "materialize-css";
import axios from 'axios'
import "materialize-css/dist/css/materialize.min.css";
import "react-datepicker/dist/react-datepicker.css";

class Modal extends Component {
    state = {
        times: []
    }

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "10%",
            endingTop: "4%",
        };
        M.Modal.init(this.Modal, options);

        axios.get('http://localhost:3004/activity_periods')
        .then(res => {
            console.log(res.data);
            this.setState({
                times: res.data
            });
        })
    }

    render() {
        const { times } = this.state
        const timeList = times.length ? (
            times.map(time => {
                return (
                    <div key={time.id}>
                        <label htmlFor="start-date">Start Date</label>
                        <input type="datetime-local" Value={time.start_time} readonly/>
                        <label htmlFor="end-date">End Date</label>
                        <input type="datetime-local" Value={time.end_time} readonly/><br/><br/><br/>
                    </div>
                )
            })
        ) : (
        <div className="center">Loading Standby...</div>
        );

        return (
        <div>
            <a
            className="waves-effect waves-light btn modal-trigger"
            data-target="modal2"
            >
            Active Details
            </a>

            <div style={{width: '75% !important', height: '75% !important' }}
            ref={Modal => {
                this.Modal = Modal;
            }}
            id="modal2"
            className="modal"
            >
            <div className="modal-content">
                <h4 style={{textAlign: 'center'}}><u>Active Periods of the Member</u></h4><br/>
                { timeList }
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-purple btn">
                    OK
                </a>
            </div>
            </div>
        </div>
        );
    }
}

export default Modal;
