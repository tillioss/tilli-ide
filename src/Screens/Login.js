import React from 'react';
import image1 from "../../src/images/teqbahn.png";
import MyConstant from '../config/MyConstant';
import image2 from "../images/logos.png"
import { ToastContainer, toast } from 'react-toastify';
import { doConnect } from '../config/Common';
import { Link } from "react-router-dom";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: ""
    }
  }

  async getLogin() {
    let { Username, Password } = this.state;
    if (Username !== "" && Password !== "") {
      let postJson = { loginId: Username, password: Password }
      let responseData = await doConnect("adminLogin", "POST", postJson);
      var responseCode = responseData["responseCode"];
      var adminType = responseData["adminType"];
      console.log(responseData);
      if (responseCode === "1") {
        localStorage.setItem("userType", adminType);
        localStorage.setItem("loggedUsername", responseData.name);
        localStorage.setItem("loginId", responseData.loginId);
        window.location = '/' + MyConstant.keyList.projectUrl + '/Dashboard'
      } else {
        toast.error('Invalid Login details', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Incorrect email or password.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  render() {
    let { Username, Password } = this.state
    let year = new Date().getFullYear();
    return (
      <section className="h-100 gradient-form">
        <ToastContainer />
        <div className="container h-100" style={{ backgroundColor: "#6bc8ae" }}>
          <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh", overflow: 'auto' }}>
            <div className="col-xl-10">
              <div className="card rounded-3 text-black" style={{ borderRadius: "25px" }}>
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={image2} style={{ width: "120px", height: "120px" }} alt="loading" />
                        <h1 style={{ fontSize: "20px" }}>Login Form</h1>
                      </div>
                      <form style={{ marginTop: "10%" }}>
                        <div className="form-outline mb-4">
                          <input type="text" className="form-control" value={Username} placeholder="Username" onChange={(e) => {
                            this.setState({ Username: e.target.value })
                          }} /> </div>

                        <div className="form-outline mb-4">
                          <input type="password" value={Password} className="form-control" placeholder="Password" onChange={(e) => {
                            this.setState({ Password: e.target.value })
                          }} />

                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <Link to={"#"} className="btn btn-success btn-block fa-lg " onClick={() => this.getLogin()} >Login</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4" style={{ marginTop: "10%" }}><img src={image1} width="70%" alt="loading" /></h4>
                      <p style={{ color: "#8492a5" }}>©{year} All Rights Reserved. Teqbahn Privacy and Terms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default Login;
