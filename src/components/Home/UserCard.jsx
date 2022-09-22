import React from "react";
import Avatar from "./Avatar";
import styles from "./UserCard.module.css";
import Button from "react-bootstrap/Button";

const UserCard = ({ user, onLogout }) => {
    return (
        <div className={styles.user_card}>
            <div className={styles.left_side}>
                <Avatar user={user} />
                <span>
                    {user.first_name} {user.last_name}
                </span>
            </div>
            <Button onClick={onLogout} variant="danger">
                Logout
            </Button>
        </div>
    );
};

export default UserCard;
