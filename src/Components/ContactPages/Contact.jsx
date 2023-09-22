const Contact = (props) => {
    return(
        <div className="row p-md-2 mb-2 border border-2 border-black border-opacity-50">
            <div className="col-2 col-md-1 pt-2 pt-md-1">
                <img alt="" src={`https://ui-avatars.com/api/?name=${props.contact.name}`}
                style={{width: '100%'}}>

                </img>
            </div>
            <div className="col-6 col-md-5 text-warning pt-0">
                <span className="h4">{props.contact.name}</span>
                <br/>
                <div className="text-black">
                    {props.contact.email}
                    <br/>
                    {props.contact.phone}
                </div>
            </div>
            <div className="col-2 col-md-2 pt-md-3">
                <button className={`btn btn-sm ${
                    props.contact.isFavorite ? "btn-warning": "btn-outline-warning"
                }`} onClick={() => props.favoriteClick(props.contact)}>
                    <i className="bi bi-star"></i>
 
                </button>
            </div>
            <div className="col-2 col-md-3 pt-md-3">
                <button className="btn btn-primary btn-sm m-1"
                    onClick={() => props.handleUpdateContact(props.contact)}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger btn-sm m-1"
                    onClick={() => props.deleteClick(props.contact)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>
    );  
    
};

        
export default Contact;