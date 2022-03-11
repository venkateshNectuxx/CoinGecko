import React, { useState, useEffect } from "react";
import { Col, Row} from "react-bootstrap";
import { APIURL } from "../../config";
import { httpServices } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableList from "../../reusable/table";
import CoinDetail from "./coin"

/*
* To List coins and showing the details in popup 
*/
const CoinList = () => {
  const [coinData, setCoinData] = useState([]);
  const [coinDetails, setCoinDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

// custom columns which can be sent to tablelist component
  const Columns = [
    { 
      dataField : "image",
      text : "Image",
      editable: false,
      formatter: (_cellContent: any, row: any) => {
        return (
          <div>
            <img src={row.image} className="logoImage" alt="coin" />
          </div>
        );
      },
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "symbol",
      text: "Symbol",
    },
    {
      dataField: "current_price",
      text: "Current Price",
    },
    {
      dataField: "high_24h",
      text: "High 24 hour Price",
    },
    {
      dataField: "low_24h",
      text: "Low 24 hour Price",
    },
   
  ];

  // function to get the list of all coins and render in table view
   
  const listCoin = () => {
    const params = "?vs_currency=eur&order=market_cap_desc";
    httpServices.get(APIURL.COIN + APIURL.DS + APIURL.GET_MARKETS + params).then(
      (resp:any) => {
        if (resp) {
          setCoinData(resp);
        }
      },
      (error:any) => {
        if (Array.isArray(error)) {
          error = error[0].msg;
        }
        const respErr = error ? error.toString() : "No response from Server";
        toast.error(respErr);
        toast.clearWaitingQueue();
      }
    );
  };

  // function to get the individual coin data
  const getCoin = (id:any) => {
    httpServices.get(APIURL.COIN + APIURL.DS + id).then(
      (resp:any) => {
        if (resp) {
          setShowModal(true)
           setCoinDetails(resp);
        }
      },
      (error:any) => {
        // if error comes as an array we will get the first array to show in toast
        if (Array.isArray(error)) {
          error = error[0].msg;
        }
        const respErr = error ? error.toString() : "No response from Server";
        toast.error(respErr);
        toast.clearWaitingQueue();
      }
    );
  }

  //useEffect calls after document mounted
  useEffect(() => {
    listCoin(); // initial function to call and render data
  }, []);
  
  return (
    <div className="coinListWrapper">
      <Row>
        <Col>
          <h5 className="sectionTitle"> List Coins </h5>
        </Col>
      </Row>
      <br />

      <Row>
        <Col>
        <TableList 
          listData = {coinData}
          columns = {Columns}
          onrowClick ={getCoin}
        />
        </Col>
      </Row>
        <CoinDetail closeModal={() => setShowModal(false)} isShowModal={showModal} coinDetails={coinDetails} />
    </div>
  );
};

export default CoinList;
