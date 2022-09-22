import React from "react";
import styles from "./UserModal.module.css";

import Button from "react-bootstrap/Button";
import { Modal as BsModal } from "react-bootstrap";
import Avatar from "./Avatar";

const UserModal = ({ show, onClose, user }) => {
    const { first_name, last_name, email } = user;

    return (
        <BsModal show={show} onHide={onClose}>
            <BsModal.Header closeButton />

            <BsModal.Body>
                <div className={styles.user_container}>
                    <Avatar w={100} h={100} user={user} />
                    <div className="text-center">
                        <div className={styles.name}>
                            {first_name} {last_name}
                        </div>

                        <div>{email}</div>
                    </div>
                </div>
            </BsModal.Body>
            <BsModal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </BsModal.Footer>
        </BsModal>
    );
};

export default UserModal;
