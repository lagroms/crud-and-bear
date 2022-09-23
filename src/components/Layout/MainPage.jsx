import React from "react";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import styles from "./MainPage.module.css";

const MainPage = ({ leftSideChildren, rightSideChildren }) => {
    return (
        <div className={styles.container}>
            <LeftSide children={leftSideChildren} />
            <RightSide children={rightSideChildren} />
        </div>
    );
};

export default MainPage;
