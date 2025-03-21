// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action){
            state.billList = action.payload;
        },
        addBill(state, action){
            state.billList.push(action.payload);
            localStorage.setItem('billList', JSON.stringify(state.billList));
        }
    }
});

const getBillList = () => {
    return (
        async (dispatch) => {
            // const res = await axios.get('http://localhost:8888/ka');
            const localData = JSON.parse(localStorage.getItem('billList')) || [{
                "type": "pay",
                "money": -20,
                "date": dayjs().format('YYYY-MM-DD'),
                "useFor": "food",
                "id": 1
            }];
            const data = localData;
            dispatch(setBillList(data));
        }
    );
}

const addBillList = (data) => {
    return (
        async (dispatch) => {
            // const res = await axios.post('http://localhost:8888/ka', data);
            const newBill = {
                ...data,
                date: dayjs(data.date).format('YYYY-MM-DD'),
                id: data.date + data.type
            }
            dispatch(addBill(newBill));
        }
    );
}

const { setBillList, addBill } = billStore.actions;
const reducer = billStore.reducer;

export { getBillList, addBillList };
export default reducer;