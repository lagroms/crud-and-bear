import React, { useEffect, useState, useMemo } from "react";
import styles from "./HomePage.module.css";

import useApi from "../hooks/useApi";
import { getUsers, postUser, deleteUser, editUser, getUser } from "../api";

import Table from "../components/Home/Table";
import CreateEditModal from "../components/Home/CreateEditModal";
import WarningModal from "../components/Home/WarningModal";
import Header from "../components/Home/Header";
import InfoCard from "../components/Home/InfoCard";
import MainPage from "../components/Layout/MainPage";
import Pagination from "../components/Home/Pagination";
import SearchInput from "../components/Home/SearchInput";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { userActions } from "../store/user";
import { authActions } from "../store/authentication";
import UserCard from "../components/Home/UserCard";
import UserModal from "../components/Home/UserModal";
import { toast } from "react-toastify";

const HomePage = () => {
    const myProfile = useSelector((state) => state.user.user);
    const { userId } = useParams();

    const dispatch = useDispatch();

    const getUserApi = useApi(getUser);
    const getUsersApi = useApi(getUsers);
    const postUserApi = useApi(postUser);
    const editUserApi = useApi(editUser);
    const deleteUserApi = useApi(deleteUser);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(0);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const loadUsers = (page) => {
        getUsersApi.request(page);
    };

    useEffect(() => {
        if (userId) getUserApi.request(userId);
    }, [userId]);

    useEffect(() => {
        if (Object.keys(getUserApi.data).length > 0 && !getUserApi.error) {
            handleShowUser(getUserApi.data.data);
        } else if (getUserApi.error !== false) {
            toast.error("User not found");
        }
    }, [getUserApi.data]);

    useEffect(() => {
        loadUsers(page);
    }, []);

    useEffect(() => {
        if (Object.keys(getUsersApi.data).length > 0 && !getUsersApi.error) {
            setPage(getUsersApi.data.page);
            setTotalUsers(getUsersApi.data.total);
            setTotalPages(getUsersApi.data.total_pages);
            setUsersPerPage(getUsersApi.data.perPage);
            setUsers(getUsersApi.data.data);
        }
    }, [getUsersApi.data, getUsersApi.error]);

    // ! =========== CRUD OPERATIONS ================

    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState("");
    const [userToDelete, setUserToDelete] = useState("");
    const [userToEdit, setUserToEdit] = useState("");
    const [editMode, setEditMode] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleAddUser = (data) => {
        postUserApi.request(data);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (editMode) setEditMode(false);
    };

    const handleDeleteUser = () => {
        deleteUserApi.request(userToDelete.id);
    };

    const handleMultiDelete = () => {
        selectedUsers.forEach((user) => deleteUserApi.request(user.id));
    };

    const handleEditUser = (user) => {
        setEditMode(true);
        setUserToEdit(user);
        handleShowModal();
    };

    const handleSaveEdit = (data) => {
        editUserApi.request(data);
        if (data.id === myProfile.id) dispatch(userActions.save(data));
        handleCloseModal();
    };

    //* RELOAD TO PAGE 1 WHEN ADDING / EDITING / DELETING USERS
    //* COULD UPDATE THE STATE, BUT WOULD MESS WITH THE PAGINATION WHEN ADDING / DELETING
    //* SAFER TO RELOAD WITH API CALL
    useEffect(() => {
        if (
            postUserApi.data?.status === "success" ||
            deleteUserApi.data?.status === "success" ||
            editUserApi.data?.status === "success"
        ) {
            loadUsers(1);
            setSelectedUsers([]);
            if (showWarning) setShowWarning("");
        }
    }, [deleteUserApi.data, postUserApi.data, editUserApi.data]);

    // !====== SHOW 1 USER ======

    const [showUser, setShowUser] = useState(false);
    const [userToShow, setUserToShow] = useState("");

    const handleShowUser = (user) => {
        setUserToShow(user);
        setShowUser(true);
    };

    // !====== SELECT HANDLERS ======

    const handleToggleSelect = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers((prevState) => prevState.filter((selectedUser) => selectedUser !== user));
        } else {
            setSelectedUsers((prevState) => [...prevState, user]);
        }
    };

    const handleToggleSelectAll = () => {
        if (filteredUsers.filter((user) => user.id !== myProfile.id).length === selectedUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.filter((user) => user.id !== myProfile.id));
        }
    };

    // !====== PAGE HANDLERS ======

    const handlePrevPage = () => {
        loadUsers(page - 1);
        setSelectedUsers([]);
    };

    const handleNextPage = () => {
        loadUsers(page + 1);
        setSelectedUsers([]);
    };

    // !====== SEARCH HANDLERS ======

    const [searchInput, setSearchInput] = useState("");

    const handleSearch = ({ target }) => {
        setSearchInput(target.value);
    };

    const filteredUsers = useMemo(
        () =>
            users.filter(
                (user) =>
                    user.first_name.toLowerCase().includes(searchInput) ||
                    user.last_name.toLowerCase().includes(searchInput)
            ),

        [searchInput, users]
    );

    // !==== logout ===

    const logout = () => {
        dispatch(userActions.reset());
        dispatch(authActions.logout());
    };

    const showDeleteButton = selectedUsers.length > 0 && !selectedUsers.map((user) => user.id).includes(myProfile.id);

    return (
        <MainPage
            leftSideChildren={
                <div className={styles.left_container}>
                    <UserCard user={myProfile} onLogout={logout} />
                </div>
            }
            rightSideChildren={
                <div className={styles.container}>
                    <Header title={"My Dashboard"} onAdd={handleShowModal} />
                    <div className={styles.cards_container}>
                        <InfoCard
                            title="Total Users"
                            data={totalUsers}
                            isLoading={getUsersApi.loading && users.length === 0}
                        />
                    </div>

                    <div className={styles.search_container}>
                        {showDeleteButton && (
                            <Button onClick={() => setShowWarning("multi")} variant="danger">{`${
                                selectedUsers.length === 1 ? "DELETE USER" : `DELETE ${selectedUsers.length} USERS`
                            }`}</Button>
                        )}
                        <SearchInput onSearch={handleSearch} value={searchInput} />
                    </div>

                    {getUsersApi.loading && (
                        <div className={styles.spinner_container}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}

                    {!getUsersApi.loading && users.length > 0 && (
                        <Table
                            data={filteredUsers}
                            onDelete={(user) => {
                                setShowWarning("single");
                                setUserToDelete(user);
                            }}
                            onEdit={handleEditUser}
                            onSelectAll={handleToggleSelectAll}
                            onSelect={handleToggleSelect}
                            selectedUsers={selectedUsers}
                            usersPerPage={usersPerPage}
                            onShowUser={handleShowUser}
                        />
                    )}

                    <Pagination
                        onPrevious={handlePrevPage}
                        onNext={handleNextPage}
                        page={page}
                        totalPages={totalPages}
                        isLoading={getUsersApi.loading && users.length === 0}
                    />

                    {showModal && (
                        <CreateEditModal
                            title={editMode ? "Edit a user" : "Add a user"}
                            buttonText={editMode ? "Edit user" : "Add user"}
                            onClose={handleCloseModal}
                            onSubmit={editMode ? handleSaveEdit : handleAddUser}
                            data={editMode ? userToEdit : undefined}
                            editMode={editMode}
                        />
                    )}

                    <UserModal show={showUser} user={userToShow} onClose={() => setShowUser(false)} />

                    <WarningModal
                        show={showWarning}
                        onClose={() => setShowWarning("")}
                        message={
                            showWarning === "single"
                                ? `Are you sure that you want to delete ${userToDelete.first_name} ${userToDelete.last_name}`
                                : selectedUsers.length === 1
                                ? `Are you sure that you want to delete ${selectedUsers[0].first_name} ${selectedUsers[0].last_name}`
                                : `Are you sure that you want to delete ${selectedUsers.length} users`
                        }
                        title={"Are you sure?"}
                        onSubmit={showWarning === "single" ? handleDeleteUser : handleMultiDelete}
                    />
                </div>
            }
        />
    );
};

export default HomePage;
