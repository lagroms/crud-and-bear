import React from "react";
import styles from "./Avatar.module.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Avatar = ({ user, w, h }) => {
    const { avatar, first_name, last_name } = user;

    return (
        <>
            {avatar ? (
                <LazyLoadImage
                    className={styles.avatar}
                    wrapperClassName={styles.wrapper}
                    alt={`${first_name} ${last_name}`}
                    effect="blur"
                    src={avatar}
                    height={h ?? 40}
                    width={w ?? 40}
                />
            ) : (
                <div className={styles.img_wrapper} style={{ width: `${w}`, height: `${h}` }}>
                    {avatar && <img className={styles.avatar} src={avatar} alt={`${first_name} ${last_name}`} />}
                </div>
            )}
        </>

        // <div className={styles.img_wrapper} style={{ width: `${w}`, height: `${h}` }}>
        //     {avatar && <img className={styles.avatar} src={avatar} alt={`${first_name} ${last_name}`} />}
        // </div>
    );
};

export default Avatar;

// import React from "react";
// import styles from "./Avatar.module.css";

// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// const Avatar = ({ user, w, h }) => {
//     const { avatar, first_name, last_name } = user;

//     return (
//         <LazyLoadImage
//             className={styles.avatar}
//             wrapperClassName={styles.wrapper}
//             alt={`${first_name} ${last_name}`}
//             effect="blur"
//             src={avatar}
//             height={h ?? 40}
//             width={w ?? 40}
//         />
//     );
// };

// export default Avatar;
