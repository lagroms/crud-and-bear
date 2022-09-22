import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { logUser } from "../api";
import styles from "./LoginPage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication";
import { userActions } from "../store/user";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginApi = useApi(logUser);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (Object.keys(loginApi.data).length > 0 && !loginApi.error) {
            dispatch(authActions.login());
            dispatch(userActions.save(loginApi.data.data));
        } else if (loginApi.error !== false) {
            toast.error("User not found");
        }
    }, [dispatch, history, loginApi.data, loginApi.error]);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        } else {
            loginApi.request(email);
        }

        setValidated(true);
    };
    return (
        <main className={styles.auth}>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setEmail(target.value)}
                        type="email"
                        placeholder="achji.remi@gmail.com to login"
                        required
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button type="submit" variant="primary">
                        Log in
                    </Button>
                </div>
            </Form>
        </main>
    );
};

export default LoginPage;
