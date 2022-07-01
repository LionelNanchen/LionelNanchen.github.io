import moment, { type Moment } from "moment";
import axios from 'axios';

// http://worldtimeapi.org/
export default class TimeAPI {
    static async now(): Promise<Moment> {
        return moment();
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Zurich');
        if (response?.data?.datetime) return moment(response.data.datetime);
        else return moment();
    }
}