import React from "react";
import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";

const Header = ({ title, onAdd }) => {
    return (
        <div className={styles.header}>
            <h2>{title}</h2>
            <Button onClick={onAdd} variant="primary">
                + ADD USER
            </Button>
        </div>
    );
};

export default Header;
