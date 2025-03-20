import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";


const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action){
            state.billList = action.payload;
        }
    }
});

const getBillList = () => {
    return (
        async (dispatch) => {
            console.log(3);
            const res = await axios.get('http://localhost:8888/ka');
            dispatch(setBillList(res.data));
        }
    );
}

const { setBillList } = billStore.actions;
const reducer = billStore.reducer;

export { getBillList };
export default reducer;