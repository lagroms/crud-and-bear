import styles from "./RightSide.module.css";

const RightSide = ({ children }) => {
    return <div className={styles.right_side_wrapper}>{children}</div>;
};

export default RightSide;
