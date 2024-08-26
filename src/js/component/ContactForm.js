// ContactForm.js
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    useEffect(() => {
        if (isEdit) {
            const contact = store.contacts.find(c => c.id === parseInt(id));
            if (contact) {
                setContactData(contact);
            }
        }
    }, [id, isEdit, store.contacts]);

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await actions.editContact(id, contactData);
            } else {
                await actions.addContacts(contactData);
            }
            await actions.getContacts();
            navigate("/");
        } catch (error) {
            console.error(isEdit ? "Error updating contact" : "Error adding contact", error);
        }
    };

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseOver = () => {
        setIsHovered(true);
    };
    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">{isEdit ? "Update Contact" : "Add a New Contact"}</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={contactData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={contactData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone"
                        value={contactData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter address"
                        value={contactData.address}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary form-control mt-4">
                    {isEdit ? "Update Contact" : "Save"}
                </button>
            </form>
            <a
                href="/"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{
                    textDecoration: isHovered ? 'underline' : 'none',
                    cursor: 'default'
                }}
            >
                Or get back to contacts
            </a>
        </div>
    );
};

export default ContactForm;
