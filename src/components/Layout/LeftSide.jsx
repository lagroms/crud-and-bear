import styles from "./LeftSide.module.css";

const LeftSide = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default LeftSide;
