import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="assets/images/logo.png" className="mr-2" alt="logo" /></a>
                    <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo.png" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    {/* <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="icon-menu" />
                    </button> */}
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            <div className="input-group">
                                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                    <span className="input-group-text" id="search">
                                        <i className="icon-search" />
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
                            </div>
                        </li>

                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator dropdown-toggle" id="businessSetup" href="#" data-toggle="dropdown">
                                Setup
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="businessSetup">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Setup</p>

                                <a className="dropdown-item preview-item">
                                    <NavLink to={"/journaldefinition"} className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Journal Definition</h6>
                                    </NavLink>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <NavLink to={"/listproductfunctioncategory"} className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Product Function Category</h6>
                                        {/* <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
                                        </p> */}
                                    </NavLink>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator dropdown-toggle" id="transactions" href="#" data-toggle="dropdown">
                                Transactions
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="transactions">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Transactions</p>
                                <a className="dropdown-item preview-item">
                                    <NavLink to={"/transaction"} className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Transaction</h6>
                                    </NavLink>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <NavLink to={"/listjournal"} className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Journal</h6>
                                    </NavLink>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link count-indicator dropdown-toggle" id="reports" href="#" data-toggle="dropdown">
                                Reports
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="reports">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Reports</p>
                                <a className="dropdown-item preview-item">
                                    <NavLink to={"/"} className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Stock Receipt</h6>
                                        {/* <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
                                        </p> */}
                                    </NavLink>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item nav-profile dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                                <img src="assets/images/default.jpg" alt="profile" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <a className="dropdown-item">
                                    <i className="ti-settings text-primary" />
                                    Settings
                                </a>
                                <a className="dropdown-item">
                                    <i className="ti-power-off text-primary" />
                                    Logout
                                </a>
                            </div>
                        </li>
                       
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu" />
                    </button>
                </div>
            </nav>

        </>
    )
}
