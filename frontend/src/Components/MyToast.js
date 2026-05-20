import React from 'react';
import { Toast } from 'react-bootstrap';

class MyToast extends React.Component {

    render() {

        return (
            <Toast
                className={`border text-white ${
                    this.props.type === "success"
                        ? "border-success bg-success"
                        : "border-danger bg-danger"
                }`}
                style={{
                    position: 'fixed',
                    top: '80px',
                    right: '20px',
                    zIndex: 1
                }}
                show={this.props.show}
            >

                <Toast.Header
                    className={`text-white ${
                        this.props.type === "success"
                            ? "bg-success"
                            : "bg-danger"
                    }`}
                    closeButton={false}
                >
                    <strong className="mr-auto">
                        {this.props.type === "success"
                            ? "Success"
                            : "Error"}
                    </strong>
                </Toast.Header>

                <Toast.Body>
                    {this.props.message}
                </Toast.Body>

            </Toast>
        );
    }
}

export default MyToast;