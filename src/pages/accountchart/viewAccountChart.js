import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { notifySuccess } from '../../utils/toast';
import { formatter1 } from '../../utils/formatter';
import Backbutton from '../../components/backbutton';

export default function ViewAccountChart() {

    const [accountChart, setAccountChart] = useState({
        accountName: "Ayomide",
        accountType: "Asset",
        headerAccount: "Goods",
        balance: 1000,
        isHeader: true,
    });


    return (
        <>
            <div className="content-wrapper mt-5">
                <div className="card mb-1">
                    <div className="card-body">
                        <div className="text-center page-head">
                            <span className="card-title">ACCOUNT CHART</span>
                        </div>
                        <div className="row d-flex float-right mt-2">
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-6 mb-3">
                                <label className="font-weight-bold float-left">Account Name:</label>&nbsp;
                                <span className="text-capitalize float-left ml-1 mr-1">{accountChart?.accountName}</span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="font-weight-bold float-left">Account Type:</label>&nbsp;
                                <span className="text-capitalize float-left ml-1 mr-1">{accountChart?.accountType}</span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="font-weight-bold float-left">Header Account:</label>&nbsp;
                                <span className="text-capitalize float-left ml-1 mr-1">{accountChart?.headerAccount}</span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="font-weight-bold float-left">Balance:</label>&nbsp;
                                <span className="text-capitalize float-left ml-1">&#8358; {formatter1.format(accountChart?.balance)}</span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="font-weight-bold float-left">Is Header:</label>&nbsp;
                                <span className="text-capitalize float-left ml-1">{accountChart?.isHeader ? "True" : "False"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
