import React, { useMemo } from "react";
import styles from "./Table.module.css";
import { Table as BsTable } from "react-bootstrap";

import deleteIcon from "../../images/delete-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Table = ({ data, onDelete, onEdit, onSelectAll, onSelect, selectedUsers, usersPerPage, onShowUser }) => {
    const myProfile = useSelector((state) => state.user.user);

    const usersList = useMemo(
        () =>
            data.map((user) => (
                <tr key={user.id} onClick={() => onShowUser(user)}>
                    <td>
                        {myProfile.id !== user.id && (
                            <Form.Check
                                type={"checkbox"}
                                checked={selectedUsers.map((item) => item.id).includes(user.id)}
                                onChange={() => onSelect(user)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                    </td>
                    <td>
                        <Avatar user={user} />
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                        <div className={styles.controls}>
                            {myProfile.id !== user.id && (
                                <img
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(user);
                                    }}
                                    className={styles.icon}
                                    src={deleteIcon}
                                    alt="Delete"
                                />
                            )}
                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(user);
                                }}
                                className={styles.icon}
                                src={editIcon}
                                alt="Edit"
                            />
                        </div>
                    </td>
                </tr>
            )),
        [data, selectedUsers]
    );

    return (
        <BsTable className={styles.table}>
            <thead>
                <tr>
                    <th>
                        <Form.Check checked={selectedUsers.length === usersPerPage} onChange={onSelectAll} />
                    </th>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{usersList}</tbody>
        </BsTable>
    );
};

export default Table;
