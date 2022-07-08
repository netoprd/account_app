
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Backbutton from '../../components/backbutton';
import api from '../../utils/api';
import { accounts } from '../../utils/chartofaccountdemodata';
import { notifySuccess } from '../../utils/toast';
import dbData from '../../accdb';

export default function EditChartOfAccount() {
    const history = useNavigate()
    const [loading, setloading] = useState(false);
    const [headerAccounts, setHeaderAccounts] = useState([]);
    const [itemToEdit, setItemToEdit] = useState({
        accountCode: "",
        accountName: "",
        accountType: "",
        headerAccountName: "",
        headerAccountCode: "",
        balance: 0,
        isHeader: false,
        createdBy: "",
        createdOn: ""
    });
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        mode: "onChange",
        reValidateMode: 'onChange'
    });
    useEffect(() => {
        const response = accounts;
        const headerAccount = response?.data?.filter(x => x.isHeaderAccount);
        setHeaderAccounts(headerAccount);
    }, []);
    const getById = dbData.getchartofaccountbyId(5);
    console.log({ getById })

    const handleOnChange = (e) => {
        const { name, value, checked } = e.target
        setItemToEdit({
            ...itemToEdit,
            [name]: value ?? JSON.parse(value),
        })
    }

    const selectHeaderAccount = (code) => {
        const x = headerAccounts.find(y => y.accountCode === code)
        setValue("headerAccountName", x?.accountName);
        setValue("headerAccountCode", x?.accountCode);
        console.log("itemToEdit", itemToEdit)
    }

    const save = async (itemToEdit) => {
        try {
            itemToEdit.createdBy = "ayomide";
            itemToEdit.createdOn = "Tue Jul 06 2022 11:40:42 GMT+0100 (West Africa Standard Time)";
            // setloading(true);
            // const created = await api.User.save(itemToEdit);
            // setloading(false)
            // notifySuccess("Successfully Created");
            // notifySuccess(created.sucessMessage);
            // history("/userslist");
            // setloading(false);
            console.log("itemToEdit", itemToEdit)
            // savechartofaccount(itemToEdit)
            // accdb.savechartofaccount(itemToEdit)
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
                            <span className="d-none d-md-block">{loading ? "SUBMITTING " : "SUBMIT"}</span>
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
                            <label htmlFor="headerAccountName" className="form-label float-left">Header Account
                                {/* <span className='text-danger'>*</span> */}
                                {errors.headerAccountName &&
                                    <span className="text-danger font-weight-bold"> required</span>}
                            </label>
                            <div className='input-group'>
                                <input type="text" className="form-control text-capitalize"
                                    id="headerAccountName"
                                    name="headerAccountName"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("headerAccountName", { required: true })}
                                    placeholder="Header Account" />
                                <div
                                    style={{ cursor: 'pointer' }}
                                    class="input-group-prepend"
                                    data-toggle="modal"
                                    data-target="#participantsModal">
                                    <span
                                        className="input-group-text bg-primary text-light"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i
                                            className={
                                                "ti-plus"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
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

        {/* modal */}
        <div class="modal fade" id="participantsModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h3 class="font-weight-bold text-center">SELECT HEADER ACCOUNT</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {/* <Limit setLimit={setLimit} /> */}
                        <div className="row">
                            <div className="form-group col-md-6 mx-auto">
                                <input type="text"
                                    // ref={searchPro}
                                    className="form-control"
                                    // onChange={(e) => handleSearchOnChange(e)}
                                    placeholder="Search Header Account" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            S/N
                                                        </th>
                                                        <th className="text-left">
                                                            ACCOUNT CODE
                                                        </th>
                                                        <th className="text-left">
                                                            ACCOUNT NAME
                                                        </th>
                                                        <th>
                                                            ACTIONS
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {headerAccounts && headerAccounts.length > 0 &&
                                                        headerAccounts?.map((header, index) =>
                                                            <tr key={header.productId} >
                                                                <td >
                                                                    {index + 1}
                                                                </td>
                                                                <td className="text-left">
                                                                    <span className="text-capitalize">{header.accountCode}</span>
                                                                </td>
                                                                <td className="text-left">
                                                                    <span className="text-capitalize">{header.accountName}</span>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => selectHeaderAccount(header.accountCode)}
                                                                        class="btn btn-primary btn-sm text-white"
                                                                        data-toggle="modal"
                                                                        data-target="#participantsModal"
                                                                    >
                                                                        SELECT
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* {
                                            products?.length === 0 &&
                                            <div className='row'>
                                                <strong className='mx-auto mt-5 h3'>No Product Record</strong>
                                            </div>
                                        } */}
                                    </div>
                                    {/* {
                                        productBalance.length !== 0 &&
                                        <Paginate
                                            limit={limit}
                                            setData={setProductBalance}
                                            apiToCall={api.BalanceAdjustment.loadProduct}
                                            pageCount={pageCount}
                                        />
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

