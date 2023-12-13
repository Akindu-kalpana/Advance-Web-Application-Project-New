// import React, { useState, useContext, useEffect } from "react";
// import { LoaderContext, ProfileContext } from "../../App";
// import Sidebar from "../../Components/Sidebar/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";
// import Chart from "../../Components/Chart&Table/Chart";
// import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
// import OrderSummary from "../../Reusable Components/OrderSummary";
// import Loader from "../../Reusable Components/Loader";
// import { transactionTableData } from "../../Components/Chart&Table/TransactionData";
// import { data } from "../../Components/Chart&Table/ChartData";
// import "../../App.sass";
// import "../../Pages/Orders/Orders.sass";
// import "../../Pages/Home/Home.sass";

// const Orders = () => {
//   const { isLoading } = useContext(LoaderContext);
//   const { userName } = useContext(ProfileContext);
//   const [selectedRowId, setSelectedRowId] = useState(
//     transactionTableData[0]?.id
//   );
//   const [chartData, setChartData] = useState(data);
//   const selectedRow = transactionTableData.find(
//     (row) => row.id === selectedRowId
//   );

//   // Change the corresponding chart, bar graph and list data if the transaction table row is clicked
//   const handleRowClick = (id) => {
//     setSelectedRowId(id);
//     const newChartData = chartData.map((week) => ({
//       ...week,
//       totalOrders: Math.floor(Math.random() * 5000) + 1000,
//       ordersDelivered: Math.floor(Math.random() * 3000) + 500,
//       ordersPending: Math.floor(Math.random() * 3000) + 500,
//     }));
//     setChartData(newChartData);
//   };

//   useEffect(() => {
//     document.title = "Orders | Consumer Dashboard";
//   }, []);

//   // return (
//   //   <>
//   //     {isLoading ? (
//   //       <Loader />
//   //     ) : (
//   //       <main className="dashboard_container_main">
//   //         <Sidebar />
//   //         <div className="dashboard_container_right_panel">
//   //           <Navbar />
//   //           <div className="order_info_container_div">
//   //             <h4
//   //               style={{
//   //                 fontWeight: 700,
//   //                 margin: "0.5rem 0 0 0",
//   //                 padding: "0 0.5rem",
//   //               }}
//   //             >
//   //               Orders handled by Admin | {userName}
//   //             </h4>
//   //             {/* <div className="order_div_wrapper">
//   //               <OrderSummary selectedRow={selectedRow} />
//   //               <div className="charts_container">
//   //                 <Chart
//   //                   title="Order handled by Admin ( Last 4 weeks)"
//   //                   fillColor1="#027F89"
//   //                   fillColor2="#82ca9d"
//   //                   fillColor3="#ffc658"
//   //                   data={chartData}
//   //                   onRowClick={handleRowClick}
//   //                 />
//   //               </div>
//   //             </div> */}
//   //             <div className="transaction_list_div">
//   //               <h4 className="transaction_list_div_title">
//   //                 Last Transactions
//   //               </h4>
//   //               <TransactionDataTable
//   //                 onRowClick={handleRowClick}
//   //                 tableRows={transactionTableData}
//   //               />
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </main>
//   //     )}
//   //   </>
//   // );
// };

// export default Orders;

// Imports should be at the top of the file, outside any functions or blocks
import React, { useState, useContext, useEffect } from "react";
import { LoaderContext, ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import OrderSummary from "../../Reusable Components/OrderSummary";
import Loader from "../../Reusable Components/Loader";
import "../../App.sass";
import "../../Pages/Orders/Orders.sass";
import "../../Pages/Home/Home.sass";
import axios from "axios";


// ... (previous code)

const Orders = () => {
  const { isLoading = false } = useContext(LoaderContext) || {};
  const { userName = "" } = useContext(ProfileContext) || {};
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [parcelForm, setParcelForm] = useState({
    user_id: "",
  recipient: "",
  recipient_phoneNo: "",
  recipient_name: "",
  recipient_address: "",
  date_and_time: "",
  status: "",
  size: "",
});

const handleParcelFormChange = (e) => {
  const { name, value } = e.target;
  setParcelForm((prevForm) => ({ ...prevForm, [name]: value }));
};

const handleParcelFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3000/api/parcels", {
      user_id: parcelForm.user_id,
      recipient: parcelForm.recipient,
      recipient_phoneNo: parcelForm.recipient_phoneNo,
      recipient_name: parcelForm.recipient_name,
      recipient_address: parcelForm.recipient_address,
      date_and_time: parcelForm.date_and_time,
      status: parcelForm.status,
      size: parcelForm.size,
    });

    console.log("Parcel created:", response.data);
    // Handle success, e.g., redirect to a success page or update UI
  } catch (error) {
    console.error("Error creating parcel:", error);
    // Handle error, e.g., show an error message to the user
  }
};

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    // Modify chartData as needed
  };

  // const handleParcelFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setParcelForm((prevForm) => ({ ...prevForm, [name]: value }));
  // };
  // const handleParcelFormChange = (e) => {
  //   console.log("Handling form change...");
  //   const { name, value } = e.target;
  //   setParcelForm((prevForm) => ({ ...prevForm, [name]: value }));
  //   console.log("New form state:", parcelForm);
  // };
  

  // const handleParcelFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log("Parcel form submitted:", parcelForm);
  // };

  useEffect(() => {
    document.title = "Orders | Consumer Dashboard";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="dashboard_container_main">
          <Sidebar />
          <div className="dashboard_container_right_panel">
            <Navbar />
            <div className="order_info_container_div">
              <h4
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                }}
              >
                 Send Parcel 
              </h4>
              <div className="transaction_list_div">
                <h4 className="transaction_list_div_title">
                  
                </h4>
              </div>
              {/* Parcel Form */}
              <div className="container">
              <form className="parcel-form" onSubmit={handleParcelFormSubmit}>
                  {/* User ID (if you have it available in your context or state) */}
                  {/* Add a hidden input field or retrieve user ID as needed */}
                  {/* Example using a hidden input: */}
                  <input type="hidden" name="user_id" value={parcelForm.user_id} />

                  {/* Receiver Information */}
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="recipient_name">Recipient Name</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        id="recipient_name"
                        name="recipient_name"
                        value={parcelForm.recipient_name}
                        onChange={handleParcelFormChange}
                        className="form-input"
                        placeholder="Recipient name.."
                      />
                    </div>
                  </div>
                  {/* Receiver Phone */}
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="recipient_phoneNo">Recipient Phone</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="tel"
                        id="recipient_phoneNo"
                        name="recipient_phoneNo"
                        value={parcelForm.recipient_phoneNo}
                        onChange={handleParcelFormChange}
                        className="form-input"
                        placeholder="Recipient phone number.."
                      />
                    </div>
                  </div>
                  {/* Receiver Address */}
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="recipient_address">Recipient Address</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        id="recipient_address"
                        name="recipient_address"
                        value={parcelForm.recipient_address}
                        onChange={handleParcelFormChange}
                        className="form-input"
                        placeholder="Recipient address.."
                      />
                    </div>
                  </div>
                  {/* Date and Time */}
                  {/* You may want to use a date picker library for this field */}
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="date_and_time">Date and Time</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="datetime-local"
                        id="date_and_time"
                        name="date_and_time"
                        value={parcelForm.date_and_time}
                        onChange={handleParcelFormChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  {/* Status */}
                  {/* Depending on your application, this could be a dropdown or radio buttons */}
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="status">Status</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        id="status"
                        name="status"
                        value={parcelForm.status}
                        onChange={handleParcelFormChange}
                        className="form-input"
                        placeholder="Status.."
                      />
                    </div>
                  </div>
                  {/* Size */}
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="size">Size</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        id="size"
                        name="size"
                        value={parcelForm.size}
                        onChange={handleParcelFormChange}
                        className="form-input"
                        placeholder="Size.."
                      />
                    </div>
                  </div>
                  <br />
                  {/* Submit Button */}
                  <div className="row">
                    <input
                      type="submit"
                      value="Submit Parcel"
                      className="submit-button"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Orders;

