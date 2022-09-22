import React from "react";

import Button from "react-bootstrap/Button";
import { Modal as BsModal } from "react-bootstrap";

const UserModal = ({ show, onClose, message, title, onSubmit }) => {
    return (
        <BsModal show={show} onHide={onClose}>
            <BsModal.Header closeButton>
                <BsModal.Title>{title}</BsModal.Title>
            </BsModal.Header>

            <BsModal.Body>
                <div className="text-left">{message}</div>
            </BsModal.Body>
            <BsModal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    <b>Close</b>
                </Button>
                <Button variant="danger" onClick={onSubmit}>
                    <b>Delete</b>
                </Button>
            </BsModal.Footer>
        </BsModal>
    );
};

export default UserModal;
