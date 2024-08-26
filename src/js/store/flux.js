const getState = ({ getStore, getActions, setStore }) => {

    const API_URL = "https://playground.4geeks.com/contact/agendas";
    const user = "yjlmotley";

    const handleResponse = (response) => {
        if (!response.ok) throw { status: response.status, statusText: response.statusText };
        return response.text().then(text => text ? JSON.parse(text) : {});
    };


    return {
        store: {
            contacts: [],
        },

        actions: {
            getContacts: () => {
                fetch(`${API_URL}/${user}/contacts`)
                    .then(handleResponse)
                    .then((data) => {
                        console.log("Fetched contacts data:", data);
                        if (Array.isArray(data.contacts)) {
                            setStore({ contacts: data.contacts });
                            console.log("Contacts set in store:", data.contacts);
                        } else {
                            console.error("Fetched data is not an array:", data);
                            setStore({ contacts: [] });
                        }
                    })
                    .catch((error) => {
                        console.error('Fetching contacts failed:', error);
                        error.status === 404 && getActions().addUser();
                    });
            },

            addContacts: (contactData) => {
                fetch(`${API_URL}/${user}/contacts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData),
                })
                    .then(handleResponse)
                    .then(() => { getActions().getContacts() })
                    .catch((error) => console.error('Adding contact failed:', error));
            },

            editContact: (id, contactData) => {
                fetch(`${API_URL}/${user}/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData),
                })
                    .then(handleResponse)
                    .then(() => { getActions().getContacts(); })
                    .catch((error) => console.error('Editing contact failed:', error));
            },

            deleteContacts: (id) => {
                fetch(`${API_URL}/${user}/contacts/${id}`, {
                    method: "DELETE",
                })
                    .then(handleResponse)
                    .then(() => { getActions().getContacts(); })
                    .catch((error) => console.error('Deleting contact failed:', error));
            },

            addUser: () => {
                fetch(`${API_URL}/${user}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                })
                    .then(handleResponse)
                    .then((data) => {
                        console.log("User added successfully:", data);
                        getActions().getContacts();
                    })
                    .catch((error) => console.error('Adding user failed:', error));
            }
        },
    };
};

export default getState;