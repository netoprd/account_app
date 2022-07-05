import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Hello from './pages/hello'
// import ListStockReceipt from './pages/stockreceipt/liststockreceipt'
// import CreateStockReceipt from './pages/stockreceipt/createstockreceipt'
// import ViewStockReceipt from './pages/stockreceipt/viewstockreceipt'
// import ListSales from './pages/sales/listsales'
// import DetailSales from './pages/sales/detailsales'
// import SalesShop from './pages/sales/salesshop'
// import PreviewSalesShop from './pages/sales/previewsalesshop'
// import ListStockIssue from './pages/stockissue/liststockissue'
// import ViewStockIssue from './pages/stockissue/viewstockissue'
// import GenerateStockIssue from './pages/stockissue/generatestockissue'
// import Conversion from './pages/conversion/conversion'
// import CreateStockAdjustment from './pages/stockadjustment/createstockadjustment'
// import EditStockAdjustment from './pages/stockadjustment/editstockadjustment'
// import ListStockAdjustment from './pages/stockadjustment/liststockadjustment'
// import ViewStockAdjustment from './pages/stockadjustment/viewstockadjustment'
// import CreateStockState from './pages/stockstate/createstockstate'
// import EditStockState from './pages/stockstate/editstockstate'
// import ViewStockState from './pages/stockstate/viewstockstate'
// import ListStockState from './pages/stockstate/liststockstate'
// import CreatePriceManagement from './pages/pricemanagement/createpricemanagement'
// import ListPriceManagement from './pages/pricemanagement/listpricemanagement'
// import EditPriceManagement from './pages/pricemanagement/editpricemanagement'
// import ViewPriceManagement from './pages/pricemanagement/viewpricemanagement'
// import Signin from './pages/auth/signin/signin'
// import Signup from './pages/auth/signup/signup'
// import ProtectedRoute from './components/protectedRoute'
// import ResetPassword from './pages/auth/resetPassword'
// import ForgetPassword from './pages/auth/forgetPassword'
// import ChangePassword from './pages/auth/changePassword'
// import VerifyEmptyUserDatabase from './components/verification'
// import StockBalance from './pages/stockbalance/stockbalance'
// import EditStockReceipt from './pages/stockreceipt/editstockreceipt'
// import CreateUser from './pages/user/createuser'
// import Welcomepage from './pages/auth/welcomepage'
// import UserList from './pages/user/userlist'
// import CreateProduct from './pages/product/createproduct'
// import ListProduct from './pages/product/listproduct'
// import ViewProduct from './pages/product/viewproduct'
// import  EditProduct from './pages/product/editproduct'
// import CreateProductMeasure from'./pages/productmeasure/createproductmeasure'
// import ListProductMeasure from './pages/productmeasure/listproductmeasure'
// import CreateProductFunction from './pages/productcategory/createproductcategory'
// import ListProductCategory from './pages/productcategory/listproductcategory'
// import EditProductCategory from './pages/productcategory/editproductcategory'
// import ViewProductCategory from './pages/productcategory/viewproductcategory'
// import EditStockIssue from './pages/stockissue/editstockissue














// const MeasureUnitConversion = React.lazy(() => import("./pages/adjustment/adjustments"));
// const BalanceAdjustment = React.lazy(() => import("./pages/adjustment/adjustments"));
// const StockStateTransition = React.lazy(() => import("./pages/adjustment/adjustments"));
// const BatchTransition = React.lazy(() => import("./pages/adjustment/adjustments"));

// const AdjustmentList = React.lazy(() => import("./pages/adjustment/adjustmentList"));
// const ViewAdjustment = React.lazy(() => import("./pages/adjustment/viewAdjustment"));
// const EditAdjustment = React.lazy(() => import("./pages/adjustment/editAdjustment"));

export default function Routpage() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Hello/>} />
    
    </Routes>
      {/* <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/" element={<Signin/>} />
        <Route path="/" element={<VerifyEmptyUserDatabase Component={Signin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcomepage />} />

        <Route exact path="/reset-password/:token" element={<ResetPassword />} />
        <Route exact path="/forgot-password" element={<ForgetPassword />} />

        <Route path="/changepassword" element={<ProtectedRoute Component={ChangePassword} />} />

        <Route path="/stockreceiptlist" element={<ProtectedRoute Component={ListStockReceipt} />} />
        <Route path="/stockreceiptcreate" element={<ProtectedRoute Component={CreateStockReceipt} />} />
        <Route path="/stockreceiptedit/:id" element={<ProtectedRoute Component={EditStockReceipt} />} />
        <Route path="/stockreceiptview/:id" element={<ProtectedRoute Component={ViewStockReceipt} />} />

        <Route path="/saleslist" element={< ProtectedRoute Component={ListSales} />} />
        <Route path="/salesdetail/:id" element={<ProtectedRoute Component={DetailSales} />} />
        <Route path="/salesshop" element={<ProtectedRoute Component={SalesShop} />} />
        <Route path="/salesshoppreview" element={<ProtectedRoute Component={PreviewSalesShop} />} />

        <Route path="/stockissuelist" element={<ProtectedRoute Component={ListStockIssue} />} />
        <Route path="/stockissueview" element={<ProtectedRoute Component={ViewStockIssue} />} />
        <Route path="/stockissuegenerate" element={<ProtectedRoute Component={GenerateStockIssue} />} />
        <Route path="/stockissueedit" element={<ProtectedRoute Component={EditStockIssue} />} />
        <Route path="/packunitconversion" element={<Conversion />} />

        <Route path="/stockadjustmentcreate" element={<CreateStockAdjustment />} />
        <Route path="/stockadjustmentlist" element={<ListStockAdjustment />} />
        <Route path="/stockadjustmentedit" element={<EditStockAdjustment />} />
        <Route path="/stockadjustmentview" element={<ViewStockAdjustment />} />

        <Route path="/stockstatecreate" element={<CreateStockState />} />
        <Route path="/stockstateedit" element={<EditStockState />} />
        <Route path="/stockstateview" element={<ViewStockState />} />
        <Route path="/stockstatelist" element={<ListStockState />} />
        <Route path="/createpricemanagement" element={<ProtectedRoute Component={CreatePriceManagement} />} />
        <Route path="/pricemanagementlist" element={<ProtectedRoute Component={ListPriceManagement} />} />
        <Route path="/editpricemanagement/:id" element={<ProtectedRoute Component={EditPriceManagement} />} />
        <Route path="/viewpricemanagement/:id" element={<ProtectedRoute Component={ViewPriceManagement} />} />
        <Route path="/stockbalances" element={<ProtectedRoute Component={StockBalance} />} />
        <Route path="/createuser" element={< ProtectedRoute Component={CreateUser} />} />
        <Route path="/listproduct/viewproduct/:id" element={<ProtectedRoute Component={ViewProduct} />} />
        <Route path="/listproduct/editproduct/:id" element={<ProtectedRoute Component={EditProduct} />} />
        <Route path="/userslist" element={< ProtectedRoute Component={UserList} />} />
        <Route path="/createproduct" element={<ProtectedRoute Component={CreateProduct} />} />
        <Route path="/listproduct" element={<ProtectedRoute Component={ListProduct} />} />
        <Route path="/createproductmeasure" element={<ProtectedRoute Component={CreateProductMeasure} />} />
        <Route path="/listproductmeasure" element={<ProtectedRoute Component={ListProductMeasure} />} />
        <Route path="/createproductfunctioncategory" element={<ProtectedRoute Component={CreateProductFunction} />} />
        <Route path="/listproductfunctioncategory" element={<ProtectedRoute Component={ListProductCategory} />} />
        <Route path="/editproductfunctioncategory" element={<ProtectedRoute Component={EditProductCategory} />} />
        <Route path="/viewproductfunctioncategory/:id" element={<ProtectedRoute Component={ViewProductCategory} />} />
        <Route path="/resetpassword" element={<ProtectedRoute Component={ResetPassword} />} />



        <Route path="/measure" element={<ProtectedRoute Component={MeasureUnitConversion} />} />
        <Route path="/balanceadj" element={<ProtectedRoute Component={BalanceAdjustment} />} />
        <Route path="/stockstatetrans" element={<ProtectedRoute Component={StockStateTransition} />} />
        <Route path="/batchtrans" element={<ProtectedRoute Component={BatchTransition} />} />
        <Route path="/openadj" element={<ProtectedRoute Component={BalanceAdjustment} />} />

        <Route path="/measurelist" element={<ProtectedRoute Component={AdjustmentList} />} />
        <Route path="/balanceadjlist" element={<ProtectedRoute Component={AdjustmentList} />} />
        <Route path="/stockstatetranslist" element={<ProtectedRoute Component={AdjustmentList} />} />
        <Route path="/batchtranslist" element={<ProtectedRoute Component={AdjustmentList} />} />
        <Route path="/openadjlist" element={<ProtectedRoute Component={AdjustmentList} />} />

        <Route path="/measure/:id" element={<ProtectedRoute Component={ViewAdjustment} />} />
        <Route path="/balanceadj/:id" element={<ProtectedRoute Component={ViewAdjustment} />} />
        <Route path="/stockstatetrans/:id" element={<ProtectedRoute Component={ViewAdjustment} />} />
        <Route path="/batchtrans/:id" element={<ProtectedRoute Component={ViewAdjustment} />} />
        <Route path="/openadj/:id" element={<ProtectedRoute Component={ViewAdjustment} />} />

        <Route path="/measure/edit/:id" element={<ProtectedRoute Component={EditAdjustment} />} />
        <Route path="/balanceadj/edit/:id" element={<ProtectedRoute Component={EditAdjustment} />} />
        <Route path="/stockstatetrans/edit/:id" element={<ProtectedRoute Component={EditAdjustment} />} />
        <Route path="/batchtrans/edit/:id" element={<ProtectedRoute Component={EditAdjustment} />} />
        <Route path="/openadj/edit/:id" element={<ProtectedRoute Component={EditAdjustment} />} />



      </Routes> */}
    </>
  )
}
