import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { APIURL } from "../../config";
import { httpServices } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableList } from "../../reusable/table";
import Modal from '../../reusable/ModalDialog'

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
        <Modal 
        title={<div>{coinDetails.name}</div>}
        show={showModal} 
        onClose={() => setShowModal(false)}
        >
          <Card className="py-1 px-2 mb-4 bg-light">
          <Row className="py-2 align-items-center justify-content-between">
            <Col md={6}>
              <div className="infoHeader d-flex align-items-center">
                {/* <div className="cryptoLogo"><span><img src={coinDetails.image.thumb} alt="" /></span></div>  */}
                <div className="cryptoInfo">
                  <h3 className="cryptoName text-success">
                    {coinDetails.name}<span className="badge d-inline-block ms-1 rounded-pill bg-warning text-dark">{coinDetails.hashing_algorithm}
                    </span>
                  </h3>
                  <span className="cryptoSymbol">{coinDetails.symbol}</span>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-right">
              <div className="hashingAlgo text-right">
                {/* <p>{coinDetails.market_data.market_cap.eur} </p> */}
                <span>MarketCap</span>
                </div>
            </Col>
         
          </Row>
          </Card>
          <Row className="mb-4">
            <Col md={12}  className="descriptionWrapper">
                <h6 className="descriptionTitle">Description:</h6>
                {/* <div className="descriptionText" dangerouslySetInnerHTML={{__html: coinDetails.description.en}}></div> */}
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="modalFooter">
              <div className="genesisDate mb-4">
                <small>Genesis Date</small>
                <span>{coinDetails.genesis_date}</span>
              </div>
              <div className="homePageLink">
                <h6>Visit Our Site</h6>
                {/* <a href="">{coinDetails.links.homepage[0]}</a>  */}
              </div>
              </div>
            </Col>

          </Row>
        </Modal>
    </div>
  );
};

export default CoinList;
