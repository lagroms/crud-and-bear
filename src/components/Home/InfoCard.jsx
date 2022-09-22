import React from "react";
import styles from "./InfoCard.module.css";
import Spinner from "react-bootstrap/Spinner";

const InfoCard = ({ title, data, isLoading }) => {
    return (
        <div className={styles.card}>
            <h5 className="text-secondary">{title}</h5>

            <span className={styles.data}>{isLoading ? <Spinner animation="border" variant="secondary" /> : data}</span>
        </div>
    );
};

export default InfoCard;
