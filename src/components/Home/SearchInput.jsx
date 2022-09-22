import React from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ onSearch, value }) => {
    return (
        <div className={styles.searchContainer}>
            <input
                onChange={onSearch}
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value}
            />
        </div>
    );
};

export default SearchInput;
