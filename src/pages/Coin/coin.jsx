import { Col, Row, Card } from "react-bootstrap";
import Modal from '../../reusable/ModalDialog'

/*
* To showing the coin details in popup 
*/
const SingleCoin = ({isShowModal, closeModal, coinDetails}) => {
  
  return (
    <div className="coinListWrapper">
        <Modal 
        title={<div>Details listed for - "{coinDetails?.name}"</div>}
        show={isShowModal} 
        onClose={closeModal}
        fullscreen={false} // if we want in full screen mode enable it to true.
        >
          <Card className="py-1 px-2 mb-4 bg-light">
          <Row className="py-2 px-3 align-items-center justify-content-between">
            <Col md={6}>
              <div className="infoHeader d-flex align-items-center">
                <div className="cryptoLogo"><span><img src={coinDetails?.image?.thumb} alt="" /></span></div> 
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
                <p>{coinDetails.market_data?.market_cap.eur} </p>
                <span>MarketCap</span>
                </div>
            </Col>
         
          </Row>
          </Card>
          <Row className="mb-4">
            <Col md={12}  className="descriptionWrapper">
                <h6 className="descriptionTitle">Description:</h6>
                <div className="descriptionText" dangerouslySetInnerHTML={{__html: coinDetails?.description?.en}}></div>
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
                <a href={coinDetails.links?.homepage[0]} target="_blank" rel="noreferrer">{coinDetails.links?.homepage[0]}</a> 
              </div>
              </div>
            </Col>

          </Row>
        </Modal>
    </div>
  );
};

export default SingleCoin;
