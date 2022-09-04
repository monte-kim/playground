function Detail(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://www.ikea.com/kr/en/images/products/mala-wax-crayon-mixed-colours__1089237_pe861528_s5.jpg?f=s"
            height="300px"
            alt="detail"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-dark">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
