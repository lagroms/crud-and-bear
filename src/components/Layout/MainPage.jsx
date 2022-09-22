import React from "react";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import styles from "./MainPage.module.css";

const MainPage = ({ leftSideChildren, rightSideChildren }) => {
    return (
        <div className={styles.container}>
            <LeftSide children={leftSideChildren} />
            <RightSide children={<div className={styles.right_side_container}>{rightSideChildren}</div>} />
        </div>
    );
};

export default MainPage;
