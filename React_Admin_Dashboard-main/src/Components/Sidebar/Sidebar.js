import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import html2PDF from "jspdf-html2canvas";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileContext, ThemeContext } from "../../App";
import "../../App.sass";
import "./Sidebar.sass";

const Sidebar = () => {
  const { handleDarkMode, handleBlueColorMode, handleDefaultMode } =
    useContext(ThemeContext);
  const { userName, profilePic } = useContext(ProfileContext);
  const [logoutPrompt, setLogoutPrompt] = useState(false);

  // Handles logout
  function handleLogout() {
    setLogoutPrompt(!logoutPrompt);
    const logoutPropmtDiv = document.querySelector(".logout_prompt_div");
    logoutPropmtDiv.setAttribute(
      "style",
      `${logoutPrompt ? "" : "display: block"}`
    );
  }

  // JsPDF-Html2Canvas function to download the targeted screenshot as pdf
  const downloadPdf = () => {
    const page = document.querySelector(".dashboard_container_right_panel");
    html2PDF(page, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: "Report.pdf",
    });
  };

  return (
    <>
      <div className="dashboard_container_left_panel">
        <div className="sidebar_menu_items_top_div">
          <ul>
            <h6 className="title m-0">Main</h6>
            <Link to="/home" style={{ textDecoration: "none", color: "unset" }}>
              <li>
                <DashboardIcon className="icon" />
                <p>Package detailes</p>
              </li>
            </Link>
            <h6 className="title">Menu</h6>
            
            <Link
              to="/orders"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <li>
                <CreditCardIcon className="icon" />
                <p>Send New Parcel</p>
              </li>
            </Link>
            
            
            
          </ul>
          
        </div>
        
      </div>
    </>
  );
};

export default Sidebar;
