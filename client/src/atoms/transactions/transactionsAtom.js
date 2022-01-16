import { atom } from 'recoil';

export const account = atom({
    key: 'connectedAccount',
    default: ''
})

export const form = atom({
    key: 'formData',
    default: {
        addressTo: '',
        amount: '',
        message: '',
        keyword: ''
    }
})

export const transactions = atom({
    key: 'allTransactions',
    default: []
})

export const count = atom({
    key: 'transactionCount',
    default: localStorage.getItem('transactionCount')
})



