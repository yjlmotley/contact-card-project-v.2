import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ContactCard from "../component/ContactCard";


export const Home = () => {
	const { store } = useContext(Context);

	return (
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
				<ul className="list-group pull-down" id="contact-list">
					{store.contacts.map((contact, index) => (
						<ContactCard
							key={index}
							contact={contact}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};
