import { getRandomUser } from "../../Utility/api";

const getRandomContact = async (props) => {

    const getResponseFromApi = await getRandomUser();

    console.log(getResponseFromApi);

    const newRandomContact = { 
        name: getResponseFromApi.data.first_name + " " + getResponseFromApi.data.last_name,
        email: getResponseFromApi.data.email,
        phone: getResponseFromApi.data.phone_number
    }

    return props.handleAddRandomContact(newRandomContact);
}

const AddRandom = (props) => {
    return(
        <div>
            <button className="btn btn-success form-control"
            onClick={() => getRandomContact(props)}>Add Random Contact</button>
        </div>
    );
};

export default AddRandom;