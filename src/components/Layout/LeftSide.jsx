import styles from "./LeftSide.module.css";

const LeftSide = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.left_panel_main_wrapper}>
                <div className={styles.middle_container}>{children}</div>
            </div>
        </div>
    );
};

export default LeftSide;
