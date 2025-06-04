import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const configureTags = async (lists) => {
    let selectedLists = [];
    let keys = Object.keys(lists);
    let filteredKeys = keys.filter(key => key !== "allOfTheAbove");
    if (lists["allOfTheAbove"] === true) {
        selectedLists = [...selectedLists, ...filteredKeys];
    } else {
        filteredKeys.forEach(key => {
            if (lists[key] === true) {
                selectedLists.push(key);
            }
        })
    }
    return selectedLists;
}

export const submitForm = createAsyncThunk(
    'form/submit',
    async (userData) => {
        if (userData.email !== "" && userData.email !== undefined) {
            let checkboxValues = Object.values(userData.checkBoxes);
            if (checkboxValues.some(value => value === true)) {
                let configuredData = {
                    email: userData.email,
                    tags: await configureTags(userData.checkBoxes)
                }
                let options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(configuredData)
                }
                const response = await fetch('https://mailchimp-integration-sigma.vercel.app/update-preferences', options);
                let data = response.json();
                console.log("Data from the API", data);
                if (data.status === 404) {
                    throw new Error(data.error);
                } else {
                    return data;
                }
            } else {
                throw new Error("One checkbox must be selected.")
            }
        } else {
            throw new Error("An email must be present to associate your selection.")
        }
    }
)


const initialState = {
    email: "",
    checkBoxes: {
        newsletter: false,
        recap: false,
        events: false,
        podcasts: false,
        allOfTheAbove: true,
    },
    loading: false,
    formError: "",
    success: false,
    pageLoaded: false,
}

const checkForAllIndividualTrue = (checkBoxes) => {
    let checkBoxKeys = Object.keys(checkBoxes);
    let filteredBoxes = checkBoxKeys.filter(key => key !== "allOfTheAbove")
    let everyBox = filteredBoxes.every((checkBox) => checkBoxes[checkBox] === true);
    return everyBox;
}

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        checkboxTapped(state, action) {
            const {payload} = action;
            const {checkbox} = payload
            if (checkbox !== "allOfTheAbove") {
                state.checkBoxes[checkbox] = !state.checkBoxes[checkbox];
                console.log(`Checkbox: ${checkbox}, value: ${state.checkBoxes[checkbox]}`);
                if (state.checkBoxes["allOfTheAbove"] === true) {
                    state.checkBoxes["allOfTheAbove"] = false;
                } else if (state.checkBoxes["allOfTheAbove"] === false) {
                    if (checkForAllIndividualTrue(state.checkBoxes) === true) {
                        state.checkBoxes["allOfTheAbove"] = true;
                        let checkboxKeys = Object.keys(state.checkBoxes);
                        checkboxKeys.forEach(key => {
                            if (key !== "allOfTheAbove") {
                                state.checkBoxes[key] = false;
                            }
                        });
                    }
                }
            } else {
                // set all other false minus the allOfTheAbove and handle the rest of the logic in the slice action.
                if (state.checkBoxes[checkbox] === false) {
                    let checkboxKeys = Object.keys(state.checkBoxes);
                    checkboxKeys.forEach(key => {
                        if (key !== "allOfTheAbove") {
                            state.checkBoxes[key] = false;
                        }
                    });
                }
                state.checkBoxes[checkbox] = !state.checkBoxes[checkbox];
            }
        },
        updateEmail(state, action) {
            console.log("Email Info from reducer", action);
            const {emailText} = action.payload;
            state.email = emailText;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(submitForm.pending, (state) => {
            state.formError = "";
            state.loading = true;
        })
        .addCase(submitForm.rejected, (state, action) => {
            console.log("Here is the Action data for rejected", action);
            const {error} = action;
            state.formError = error.message;
            state.loading = false;
        })
        .addCase(submitForm.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        })        
    }
});

export const {checkboxTapped, updateEmail} = formSlice.actions

export default formSlice;