import Contact from "./Contact";

const FavoriteContacts = (props) => {
    return(
        <div className="col-12 py-2 border border-5 p-2">
           <div className="text-center">Favorites</div>
           <div className="p-2">
            {
                props.contacts.map((contact,index) => (
                <Contact contact={contact} key={index} 
                    favoriteClick={props.favoriteClick}
                    deleteClick={props.deleteClick}
                    handleUpdateContact={props.handleUpdateContact}/>
                ))
            }
           </div>
        </div>
    );
};

export default FavoriteContacts;