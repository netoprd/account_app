
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import dbData from '../../accdb';
import Backbutton from '../../components/backbutton';
import api from '../../utils/api';
import { notifySuccess } from '../../utils/toast';
//import accdb from '../../accdb'

export default function ChartOfAccount() {
    const history = useNavigate()
    const [loading, setloading] = useState(false);
    const [items, setItems] = useState({
        accountCode: "",
        accountName: "",
        accountType: "",
        headerAccount: "",
        balance: 0,
        isHeader: false,
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        reValidateMode: 'onChange'
    });

   
    const handleOnChange = (e) => {
        const { name, value, checked } = e.target
        setItems({
            ...items,
            [name]: value ?? JSON.parse(value),
        })
    }


    const save = async (items) => {
        try {
            // setloading(true);
            // const created = await api.User.save(items);
            // setloading(false)
            // notifySuccess("Successfully Created");
            // notifySuccess(created.sucessMessage);
            // history("/userslist");
            // setloading(false);
            console.log("items", items)
            // savechartofaccount(items)
            dbData.savechartofaccount(items)
            // accdb.savechartofaccount(items)
        }
        catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    return <>
        <div className="content-wrapper">
            <div className="card mt-5">
                <div className="card-body">
                    <div className="text-center">
                        <span className="card-title">ACCOUNT CHART</span>
                    </div>
                    <div className='d-flex float-right mt-2'>
                        <Backbutton />
                        <button
                            type="submit" onClick={handleSubmit(save)}
                            class="btn btn-primary btn-sm btn-icon-text text-white d-flex mx-1"
                            disabled={loading ? true : false}>
                            <i className="ti-save mr-1" title="Submit"></i>
                            <span className="d-none d-md-block"></span>
                            {loading ? "SUBMITTING " : "SUBMIT"}
                            {loading === true && <div className="spinner-border text-light spinner-grow-sm">
                            </div>}
                        </button>
                    </div>
                    <form className="row newReceiptNote mt-5">


                        <div className="form-group col-md-3">
                            <label htmlFor="accountCode" className="float-left">Account Code<span className="text-danger">*</span>
                                {errors.accountCode &&
                                    <span className="text-danger">required</span>
                                }
                            </label>
                            <input type="text" className="form-control"
                                id="accountCode"
                                name="accountCode"
                                onChange={(e) => handleOnChange(e)}
                                {...register("accountCode", { required: true })}
                                placeholder="Account Code" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="accountName" className="float-left">Account Name<span className="text-danger">*</span>
                                {errors.accountName &&
                                    <span className="text-danger">required</span>
                                }
                            </label>
                            <input type="text" className="form-control"
                                id="accountName"
                                name="accountName"
                                onChange={(e) => handleOnChange(e)}
                                {...register("accountName", { required: true })}
                                placeholder="Account Name" />
                        </div>
                        <div class="form-group col-md-3">
                            <label HtmlFor="accountType" className="form-label float-left">Account Type<span className="text-danger">* </span>
                                {errors.accountType && <span className="text-danger"> required</span>}
                            </label>
                            <select className="form-control"
                                type="text"
                                id="accountType"
                                name="accountType"

                                {...register("accountType", { required: false, onChange: (e) => handleOnChange(e) })}
                            >
                                <option value="" >Select Account Type</option>
                                <option value="asset" >Asset</option>
                                <option value="liability" >Liability</option>
                                <option value="equity(capita)" >Equity(Capital)</option>
                                <option value="revenue/expenditure" >Revenue/Expenditure</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="isHeader" className="float-left">Is Header</label>
                            <div className="custom-control custom-switch">
                                <input type="checkbox"
                                    className="custom-control-input"
                                    id="isHeader"
                                    name="isHeader"
                                    {...register("isHeader", { onChange: (e) => handleOnChange(e) })}
                                />
                                <label className="custom-control-label float-left mt-4" htmlFor="isHeader"></label>
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="headerAccount" className="float-left">Header Account
                                {errors.headerAccount &&
                                    <span className="text-danger">required</span>
                                }
                            </label>
                            <input type="text" className="form-control"
                                id="headerAccount"
                                name="headerAccount"
                                placeholder="Header Account"
                                onChange={(e) => handleOnChange(e)}
                                {...register("headerAccount", { required: true, })}
                            />
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="balance" className="float-left">Balance<span className="text-danger">*</span>
                                {errors.balance &&
                                    <span className="text-danger"> required</span>
                                }
                            </label>
                            <input type="number" className="form-control"
                                id="balance"
                                name="balance"
                                placeholder="Balance"
                                onChange={(e) => handleOnChange(e)}
                                {...register("balance", { required: true })}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>;
}

