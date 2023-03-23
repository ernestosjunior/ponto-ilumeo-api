import moment from 'moment'

export const getCurrentDate = () => moment().format('DD/MM/YYYY HH:mm:ss').split(' ')
