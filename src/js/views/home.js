import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ContactCard from "../component/contactCard";


export const Home = () => {
	const { actions, store } = useContext(Context);

	return (
		<>
			<div className="container pb-1">
				<div className="d-flex justify-content-end">
					<Link to="/addContact">
						<button className="btn btn-success my-3">Add new contact</button>
					</Link>
				</div>
				<div
					id="contacts"
					className="panel-collapse collapse show mb-5"
					aria-expanded="true">
					{store.contacts.length === 0 ? (
							<li className="list-group-item no-tasks">-- You currently do not have any contacts, please add a contact --</li>
						) : (
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map((contact, index) => (
							<ContactCard
								key={index}
								contact={contact}
								className="contact-card"
							/>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
