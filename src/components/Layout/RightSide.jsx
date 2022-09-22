import styles from "./RightSide.module.css";

const RightSide = ({ children }) => {
    return (
        <div className={styles.right_side_wrapper}>
            <div className={styles.section_wrapper}>
                <div className={styles.container}>
                    <div className={styles.content_wrapper}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
