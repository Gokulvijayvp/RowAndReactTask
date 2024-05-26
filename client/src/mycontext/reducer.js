export const initialState = {
    count: 0,
    rowData: [],
    tableData:[],
    formValues: { name: '', email: '', mobile: '' },
    isEdit: false,
    editIndex: null,
    editId:null,
    rowEditId:null,
    openUp:false,
    deletebox:false,
    rowDelId:null,
    deleteTBbox:false,
    tabelDelId:null,
}



export function Reducer(state, action) {
    switch (action.type) {
        case 'count': {
            return {...state, count: action.payload}
        }
        case 'rowData': {
            return {...state, rowData: action.payload}
        }
        case 'tableData': {
            return {...state, tableData: action.payload}
        }
        case 'formValues':{               
            return { ...state, formValues: action.payload };
        }
        case 'isEdit':{
            return { ...state, isEdit: action.payload };
        }
        case 'editIndex':{
            return { ...state, editIndex: action.payload };
        }
        case 'editId':{
            return { ...state, editId: action.payload };
        }
        case 'rowEditId':{
            return { ...state, rowEditId: action.payload };
        }
        case 'openUp':{
            return { ...state, openUp: action.payload };
        }
        case 'deletebox':{
            return { ...state, deletebox: action.payload };
        }
        case 'rowDelId':{
            return { ...state, rowDelId: action.payload };
        }
        case 'deleteTBbox':{
            return { ...state, deleteTBbox: action.payload };
        }
        case 'tabelDelId':{
            return { ...state, tabelDelId: action.payload };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}