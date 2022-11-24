import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Modal, Button, Image } from "react-bootstrap";

const EventScreen = () => {
  const [show, setShow] = useState(false);
  const [life, setLife] = useState(1);
  const arr = [
    "HDK",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
    "Chúc bạn may mắn lần sau",
  ];
  var rand = arr[(Math.random() * arr.length) | 0];
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setLife(0);
  };

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTime = () => {
    const countdownDate = new Date("November 10, 2022 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();
    return () => {
      clearInterval(interval.current);
    };
  });
  return (
    <div>
      <h4 className="text-center py-4">Thời gian diễn ra sự kiện còn</h4>
      <Row
        className="d-flex justify-content-center"
        style={{ margin: "0 auto" }}
      >
        <Col
          style={{ border: "2px solid #00cc00", borderRadius: "20px" }}
          className="mx-3"
        >
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            {timerDays}
          </div>
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            Ngày
          </div>
        </Col>
        <Col
          style={{ border: "2px solid #00cc00", borderRadius: "20px" }}
          className="mx-3"
        >
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            {timerHours}
          </div>
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            Giờ
          </div>
        </Col>
        <Col
          style={{ border: "2px solid #00cc00", borderRadius: "20px" }}
          className="mx-3"
        >
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            {timerMinutes}
          </div>
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            Phút
          </div>
        </Col>
        <Col
          style={{ border: "2px solid #00cc00", borderRadius: "20px" }}
          className="mx-3"
        >
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            {timerSeconds}
          </div>
          <div className="text-center py-2" style={{ fontSize: "30px" }}>
            Giây
          </div>
        </Col>
      </Row>
      <Row>
        <p className="text-center py-5">
          Luật chơi: Trong quá trình diễn ra sự kiện, mỗi ngày bạn sẽ được rút 1
          lá thăm may mắn, nếu rút được lá thăm có chữ HDK bạn sẽ nhận được mã
          giảm giá khi mua hàng lên đến 50%
        </p>
      </Row>
      <Row>
        <Col className="text-center">
          <Row className="d-flex justify-content-center align-items-center">
            {life !== 0 ? (
              <Image
                id="img-game"
                style={{ width: "300px", cursor: "pointer" }}
                onClick={handleShow}
                src="https://i.ibb.co/0BNVFsx/Pngtree-new-year-draw-5932670.png"
                alt="Game"
                rounded
              ></Image>
            ) : (
              <Row>
                <h5 className="py-3">Lượt kế tiếp</h5>
                <Row
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "50%", margin: "0 auto" }}
                >
                  <Col className="mx-3">
                    <div
                      className="text-center py-2"
                      style={{ fontSize: "15px" }}
                    >
                      {timerHours}
                    </div>
                    <div
                      className="text-center py-2"
                      style={{ fontSize: "15px" }}
                    >
                      Giờ
                    </div>
                  </Col>
                  <Col className="mx-3">
                    <div
                      className="text-center py-2"
                      style={{ fontSize: "15px" }}
                    >
                      {timerMinutes}
                    </div>
                    <div
                      className="text-center py-2"
                      style={{ fontSize: "15px" }}
                    >
                      Phút
                    </div>
                  </Col>
                  <Col className="mx-3">
                    <div
                      className="text-center py-2"
                      style={{ fontSize: "15px" }}
                    >
                      {timerSeconds}
                    </div>
                    <div
                      className="text-center py-2"
                      style={{ fontSize: "15px" }}
                    >
                      Giây
                    </div>
                  </Col>
                </Row>
              </Row>
            )}
          </Row>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Kết quả rút thăm</Modal.Title>
            </Modal.Header>
            <Modal.Body>{rand}</Modal.Body>
            <Modal.Body>
              {rand === "HDK" ? (
                <p>
                  Chúc mừng bạn đã nhận được mã giảm giá của của hàng. Mã giảm
                  giá của bạn là: HDK2022T10
                </p>
              ) : (
                <p>Đừng bỏ cuộc, may mắn sẽ mỉm cười với bạn vào ngày mai</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default EventScreen;
