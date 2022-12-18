// const axios = require('axios');
import axios from 'axios'
const baseURl = "https://www.balldontlie.io/api/v1/"

export const http = ({method, url, params=null}) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                baseURL: baseURl,
                method: method,
                url: url,
                params: params
            })
                .then(res => {
                    console.log("success", res)
                    resolve(res)
                })
                .catch(err => {
                    console.log("error", err)
                    reject(err)
                });
        } catch (error) {
            console.log("errror", error);
            reject("error");
        }
    });
};