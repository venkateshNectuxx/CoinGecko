import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { APIURL } from "../../config";
import { httpServices } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableList } from "../../reusable/table";
import Modal from '../../reusable/ModalDialog'
import "./styles.scss";

/*
* To List coins and showing the details in popup 
*/
const CoinList = () => {
  const [coinData, setCoinData] = useState([]);
  const [coinDetails, setCoinDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const Columns = [
    { 
      dataField : "image",
      text : "Image",
      editable: false,
      formatter: (cellContent, row) => {
        return (
          <div>
            <img src={row.image} className="logoImage" />
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

  const listCoin = () => {
    const params = "?vs_currency=eur&order=market_cap_desc";
    httpServices.get(APIURL.COIN + APIURL.DS + APIURL.GET_MARKETS + params).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setCoinData(resp);
        }
      },
      (error) => {
        console.log(error);
        if (Array.isArray(error)) {
          error = error[0].msg;
        }
        const respErr = error ? error.toString() : "No response from Server";
        toast.error(respErr);
        toast.clearWaitingQueue();
      }
    );
  };

  const getCoin = (id) => {
    httpServices.get(APIURL.COIN + APIURL.DS + id).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setShowModal(true)
           setCoinDetails(resp);
        }
      },
      (error) => {
        console.log(error);
        if (Array.isArray(error)) {
          error = error[0].msg;
        }
        const respErr = error ? error.toString() : "No response from Server";
        toast.error(respErr);
        toast.clearWaitingQueue();
      }
    );
  }

  useEffect(() => {
    listCoin();
  }, []);
  
  return (
    <div className="coinListWrapper">
      <Row>
        <Col>
          <h5 className="sectionTitle"> List of coins </h5>
        </Col>
      </Row>
      <br />

      <Row>
        <Col>{TableList(coinData, Columns, getCoin)}</Col>
      </Row>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
    {coinDetails.symbol}
        </Modal>
    </div>
  );
};

export default CoinList;
