import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal as BsModal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { nanoid } from "nanoid";

const CreateEditModal = ({ onClose, onSubmit, title, buttonText, data, editMode }) => {
    const [firstName, setFirstName] = useState(data?.first_name ?? "");
    const [lastName, setLastName] = useState(data?.last_name ?? "");
    const [email, setEmail] = useState(data?.email ?? "");
    const [fileUrl, setFileUrl] = useState(data?.avatar ?? "");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const body = {
                id: editMode ? data.id : nanoid(10),
                first_name: firstName,
                last_name: lastName,
                email,
                avatar: fileUrl,
            };

            setFirstName("");
            setLastName("");
            setEmail("");
            setFileUrl("");

            onSubmit(body);
        }

        setValidated(true);
    };

    return (
        <BsModal show={true} onHide={onClose}>
            <BsModal.Header closeButton>
                <BsModal.Title>{title}</BsModal.Title>
            </BsModal.Header>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <BsModal.Body>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            onChange={({ target }) => setFirstName(target.value)}
                            value={firstName}
                            type="text"
                            placeholder="First Name"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please enter a first name.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            onChange={({ target }) => setLastName(target.value)}
                            value={lastName}
                            type="text"
                            placeholder="Last Name"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please enter a last name.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            onChange={({ target }) => setEmail(target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please enter an email.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Upload avatar</Form.Label>
                        <Form.Control
                            onChange={(e) => setFileUrl(URL.createObjectURL(e.target.files[0]))}
                            type="file"
                            accept=".png,.jpeg,.jpg"
                        />
                    </Form.Group>

                    {/* //TODO add a file preview */}
                </BsModal.Body>
                <BsModal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        {buttonText}
                    </Button>
                </BsModal.Footer>
            </Form>
        </BsModal>
    );
};

export default CreateEditModal;
