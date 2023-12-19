import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext, ThemeContext } from "../../App";
import "../../App.sass";
import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loader from "../../Reusable Components/Loader";
import "./Home.sass";

const Home = () => {
  const { handleDarkMode } = useContext(ThemeContext);
  const { isLoading } = useContext(LoaderContext);

  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        // Assuming your Express server is running on http://localhost:5000
        const response = await axios.get('http://localhost:3000/api/parcels');
console.log (response.data)
        // Assuming the response data is an array of parcels
        setParcels(response.data);
      } catch (error) {
        console.error('Error fetching parcels:', error);
        // Handle errors or set an error state
      }
    };

    fetchParcels();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts


  useEffect(() => {
    document.title = "Home | Consumer Dashboard";
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main className="dashboard_container_main">
              <Sidebar />
              <div className="dashboard_container_right_panel" id="report_page">
                <Navbar handleDarkMode={handleDarkMode} />
                {/* <div className="cards_container">
                  <Card type="sales" backgroundColor={"#DCFCE7"} />
                  <Card type="orders" backgroundColor={"#FFF4DE"} />
                  <Card type="products" backgroundColor={"#F4E8FF"} />
                  <Card type="users" backgroundColor={"#FFE2E6"} />
                </div> */}
                {/* <div className="charts_container">
                  <Chart
                    data={data}
                    title="Orders in last 4-weeks"
                    fillColor1="#2196f3"
                    fillColor2="#4caf50"
                    fillColor3="#ff9800"
                  />
                </div> */}
                {/* <div className="summary_cards_container">
                  <SummaryCards />
                </div> */}
                <div className="lists_container">
                  <h4 className="p-2">Package Details</h4>
                  <TransactionDataTable tableRows={parcels} />
                </div>
              </div>
            </main>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Home;
