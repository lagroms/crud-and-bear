import React from "react";
import styles from "./Pagination.module.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Pagination = ({ onPrevious, onNext, page, totalPages, isLoading }) => {
    return (
        <div className={styles.container}>
            <Button disabled={page === 1} onClick={onPrevious} variant="outline-secondary">
                Previous
            </Button>
            <span className="text-secondary">
                {isLoading ? (
                    <Spinner animation="border" variant="secondary" size="sm" />
                ) : (
                    `Page ${page} of ${totalPages}`
                )}
            </span>
            <Button disabled={page === totalPages} onClick={onNext} variant="outline-secondary">
                Next
            </Button>
        </div>
    );
};

export default Pagination;
