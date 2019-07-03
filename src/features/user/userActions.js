import { toastr } from "react-redux-toastr";

export const updateProfile = (user) =>
async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    //removes fields from array by stating the fields for removal then spread operator
    const {isLoaded, isEmpty, ...updatedUser} = user;
    try {
        await firebase.updateProfile(updatedUser);
        toastr.success('Success', 'Your Profile has been updated')
    } catch (error) {
        console.log(error)
    }
}