import React from 'react';
import Header from '../Layout/Header';
import AddRandom from './AddRandom';
import RemoveAllContact from './RemoveAllContact';
import AddContact from './AddContact';
import FavoriteContacts from './FavoriteContacts';
import GeneralContacts from './GeneralContacts';
import Footer from '../Layout/Footer';

class ContactIndex extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            contactList:[
                {
                    id:1,
                    name:"Ben Parker",
                    phone:"82-123 12 56",
                    email:"ben@myemail.com",
                    isFavorite:false
                },
                {
                    id:2,
                    name:"Kathy Moens",
                    phone:"82-123 12 56",
                    email:"kathy@myemail.com",
                    isFavorite:true
                },
                {
                    id:3,
                    name:"Paul Peeters",
                    phone:"82-123 12 56",
                    email:"paul@myemail.com",
                    isFavorite:true
                }
            ],
            selectedContact: {name: "", email: "", phone: ""},
            isUpdating: false
        }
    }

    handleUpdateContact = (contact) => {
        console.log(contact);
        this.setState((prevState) => {
            return {
               selectedContact: contact,
               isUpdating: true
            }
        })
    }

    handleCancelUpdate = () => {
        this.setState((prevState) => {
            return {
               selectedContact: undefined,
               isUpdating: false
            }
        })
    }

    handleDeleteContact = (contact) => {
        // alert("Delete ?")
        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.filter( (obj) => {
                    return obj.id !== contact.id 
                })
            }
        })
    }

    handleToggleFavorite = (contact) => {
        console.log(contact);
        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.map( (obj) => {
                    if (obj.id === contact.id) {
                        return {...obj, isFavorite: !obj.isFavorite};
                    }
                    return obj;
                })
            }
        })
    }

    handleAddContact = (newContact) => {

        if (newContact.name === "") {
            return { status: "failure", msg: "Please enter a valid name" };
        } else if (newContact.phone === "") {
            return { status: "failure", msg: "Please enter a valid Phone number" };
        }
        const duplicateRecord = this.state.contactList.filter( (x) => {
            if (newContact.name === x.name && newContact.phone === x.phone) {
                return true;
            } else
            return false;
        });

        if (duplicateRecord.length > 0) 
            return { status: "failure", msg: "Contact already exists" }
        
        else {
            const newFinalContact = {...newContact, 
                id:this.state.contactList[this.state.contactList.length-1].id + 1,
                isFavorite:false,
                };
                this.setState((prevState) => {
                    return {
                        contactList: prevState.contactList.concat([newFinalContact])
                    }
                });

            return { status: "success", msg: "Contact created successfully" }

        }
     
    };

    handleUpdatingContact = (updatedContact) => {

        console.log(updatedContact);

        if (updatedContact.name === "") {
            return { status: "failure", msg: "Please enter a valid name" };
        } else if (updatedContact.phone === "") {
            return { status: "failure", msg: "Please enter a valid Phone number" };
        }
       
        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.map((obj) => {
                    if ( obj.id === parseInt(updatedContact.id)) {
                        return {
                            ...obj, 
                            name: updatedContact.name,
                            email: updatedContact.email,
                            phone: updatedContact.phone
                        }
                    }
                    return obj;
                }),
                isUpdating: false,
                selectedContact: undefined
            };
        });

        console.log(this.state.contactList);

        return { status: "success", msg: "Contact updated successfully" }

    }

    handleAddRandomContact = (newContact) => {

        const newFinalContact = {...newContact, 
            id:this.state.contactList[this.state.contactList.length-1].id + 1,
            isFavorite:false,
            };
            this.setState((prevState) => {
                return {
                    contactList: prevState.contactList.concat([newFinalContact])
                }
            });
    }

    handleRemoveAll = () => {
        // alert(" All contacts will be deleted !!")
        this.setState( (prevState) => {
            return {
                contactList: []
                }
            })
     }

    


    render() {
        return(
            <div>
                <Header/>
                <div className='container'>
                    <div className='row py-3'>
                        <div className='col-4 offset-2 row'>
                            <AddRandom handleAddRandomContact={this.handleAddRandomContact}/>
                        </div>
                        <div className='col-4 row'>
                            <RemoveAllContact handleRemoveAll={this.handleRemoveAll}/>
                        </div>
                        <div className='row py-2'>
                            <div className='col-8 offset-2 row'>
                                <AddContact 
                                    handleAddContact={this.handleAddContact}
                                    isUpdating={this.state.isUpdating}
                                    selectedContact={this.state.selectedContact}
                                    handleCancelUpdate={this.handleCancelUpdate}
                                    handleUpdatingContact={this.handleUpdatingContact}
                                />
                            </div>
                        </div>
                        <div className='row py-2'>
                            <div className='col-8 offset-2 row'>
                                <FavoriteContacts 
                                    contacts={this.state.contactList.filter(
                                    (u) => u.isFavorite === true
                                    )}
                                    favoriteClick={this.handleToggleFavorite}
                                    deleteClick={this.handleDeleteContact}
                                    handleUpdateContact={this.handleUpdateContact}
                                />
                            </div>
                        </div>
                        <div className='row py-2'>
                            <div className='col-8 offset-2 row'>
                                <GeneralContacts 
                                    contacts={this.state.contactList.filter(
                                    (u) => u.isFavorite === false
                                    )}
                                    favoriteClick={this.handleToggleFavorite}
                                    deleteClick={this.handleDeleteContact}
                                    handleUpdateContact={this.handleUpdateContact}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ContactIndex;