import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const submitForm = createAsyncThunk(
    'form/submit',
    async (userData) => {
        if (userData.email !== "") {
            let checkboxValues = Object.values(userData.checkBoxes);
            if (checkboxValues.some(value => value === true)) {
                let options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }
                const response = await fetch('http://localhost:3001/update-preferences', options);
                let data = response.json();
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
        allOfTheAbove: false,
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
                console.log("All of the above not clicked!")
                state.checkBoxes[checkbox] = !state.checkBoxes[checkbox];
                if (state.checkBoxes["allOfTheAbove"] === true) {
                    state.checkBoxes["allOfTheAbove"] = false;
                } else if (state.checkBoxes["allOfTheAbove"] === false) {
                    console.log("All of the above is false and not clicked!!!")
                    if (checkForAllIndividualTrue(state.checkBoxes) === true) {
                        console.log("All boxes are true!!");
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
            const {error} = action.payload;
            state.formError = error;
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