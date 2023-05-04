import { useState } from "react";
import axios from 'axios';
import Web3 from "web3";
import "./styles.css";
import { useLocation } from "react-router-dom";
// import { uploadFileToBlobStorage } from './cloudstorage';

// import { useHistory } from 'react-router-dom';




function AddFiles(props) {
    const [filename, setFilename] = useState("");
    const { state } = useLocation();
    const token = state.token;
    const [message] = useState("");
    const resContractJson = require("../../client/src/contracts/ResourceManagement.json");


    function handleSubmit(event) {
        event.preventDefault();

        const web3 = new Web3("http://localhost:7545");

        const resContract = new web3.eth.Contract(
            resContractJson.abi,
            "0xA7395d312f1b9258b1FaD9C26d27947D10AafF63"
        );

        const file = "https://formalproject.blob.core.windows.net/userfiles/" + filename; // append arg1 to this

        // const localFilePath = '../Files/text.txt';

        axios.get('http://localhost:3000/verify-jwt', {
            params: {
                token: token
            }
        })
            .then(function (response) {
                const token = response.data;
                console.log(token);
                console.log("Access granted");
                // JWT is verified, execute the transaction
                resContract.methods.AddFiles(file).send({ from: "0x809DbEa3428a23889E9C03D20D631711b2EbC1ED", gas: 3000000 })
                    .then(function (receipt) {
                        console.log(receipt);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                // uploadFileToBlobStorage(localFilePath, "text")
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Filename:
                <input
                    type="text"
                    value={filename}
                    onChange={(event) => setFilename(event.target.value)}
                />
            </label>
            {/* <br />
            <label>
                Token:
                <input
                    type="text"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                />
            </label>
            <br /> */}
            <button type="submit">Add</button>
            <br />
            <span>{message}</span>
        </form>
    );
}

// const Web3 = require("web3");
// const resContractJson = require("../../client/src/contracts/ResourceManagement.json");
// const web3 = new Web3("http://localhost:7545");
// const axios = require('axios');
// const downloadFile = require('./cloudstorage.js');


// const resContract = new web3.eth.Contract(
//     resContractJson.abi,
//     "0xA7395d312f1b9258b1FaD9C26d27947D10AafF63"
// );

// const token = process.argv[2];

// resContract.methods.AccessFiles("0x68F73dDD106896fE876B265406FB6d95Fd843e92").call()
//     .then(function (files) {
//         console.log(files);
//     })
//     .then(axios.get('http://localhost:3000/verify-jwt', {
//         params: {
//             token: token
//         }
//     })
//         .then(function (response) {
//             const token = response.data;
//             console.log(token);
//             console.log("Access granted");
//         })
//         .catch(function (error) {
//             console.log(error);
//         }));

function AccessFiles() {
    const [token, setToken] = useState("");
    const [message] = useState("");
    const [files, setFiles] = useState([]);
    const resContractJson = require("../../client/src/contracts/ResourceManagement.json");

    function handleSubmit(event) {
        event.preventDefault();

        const web3 = new Web3("http://localhost:7545");

        const resContract = new web3.eth.Contract(
            resContractJson.abi,
            "0xA7395d312f1b9258b1FaD9C26d27947D10AafF63"
        );

        axios.get('http://localhost:3000/verify-jwt', {
            params: {
                token: token
            }
        })
            .then(function (response) {
                const token = response.data;
                console.log(token);
                console.log("Access granted");
                resContract.methods.AccessFiles("0x809DbEa3428a23889E9C03D20D631711b2EbC1ED").call()
                    .then(function (files) {
                        console.log(files);
                        setFiles(files);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Token:
                <input
                    type="text"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Access</button>
            <br />
            <span>{message}</span>
            <br />
            <div>
                {files.map((file, index) => (
                    <span key={index}>{file}  </span>
                ))}
            </div>

        </form>
    );
}

function Files() {
    return (
        <div>
            <AddFiles />
            <AccessFiles />
        </div>
    );
}

export default Files;