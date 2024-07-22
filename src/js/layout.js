import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import ContactForm from "./component/ContactForm";
import injectContext from "./store/appContext";


const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/addContact" element={<ContactForm />} />
						<Route path="/editContact/:id" element={<ContactForm />} />
						<Route 
							path="*" 
							element={
								<React.Fragment>
									<div style={{textAlign: 'center' }}>
										<h1>Not found!</h1>
										<Link to="/">
											<button className="btn btn-primary my-4">Back home</button>
										</Link>
									</div>
								</React.Fragment>
							}
						/>
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};


export default injectContext(Layout);