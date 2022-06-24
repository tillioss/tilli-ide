import React from 'react';
import { Link } from 'react-router-dom';
import MyConstant from '../../config/MyConstant';
import TilliLogo from '../../images/logos.png';



class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }



  componentDidMount() {

    if (localStorage.getItem("userType") != "developer" && localStorage.getItem("userType") != "admin") {
      window.location = "/" + MyConstant.keyList.projectUrl
    }


    var element = document.getElementsByClassName('bg-color-chg')[0];
    element.style.background = "#FFFFFF";

    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + '/' + MyConstant.keyList.projectUrl + '/build/js/custom.min.js'
    script.async = true;
    document.body.appendChild(script);

    // let script_2 = document.createElement('script');
    // script_2.src = process.env.PUBLIC_URL+'vendors/nprogress/nprogress.js'
    // script_2.async = true;
    // document.body.appendChild(script_2);



    let script_3 = document.createElement('script');
    script_3.src = process.env.PUBLIC_URL + '/' + MyConstant.keyList.projectUrl + '/vendors/fastclick/lib/fastclick.js'
    script_3.async = true;
    document.body.appendChild(script_3);



    let script_4 = document.createElement('script');
    script_4.src = process.env.PUBLIC_URL + '/' + MyConstant.keyList.projectUrl + '/vendors/bootstrap/dist/js/bootstrap.bundle.min.js'
    script_4.async = true;
    document.body.appendChild(script_4);



    /*after /../ routing import css  */

    const link = document.createElement("link");
    link.href = process.env.PUBLIC_URL + '/' + MyConstant.keyList.projectUrl + '/build/css/custom.min.css';
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);


    // const link_2 = document.createElement("link");
    // link_2.href = process.env.PUBLIC_URL + '/' + MyConstant.keyList.projectUrl + '/vendors/font-awesome/css/font-awesome.min.css';
    // link_2.rel = "stylesheet";
    // link_2.type = "text/css";
    // document.head.appendChild(link_2);




  }

  render() {
    return (
      <div className="col-md-3 left_col" >
        <div className="left_col scroll-view sidebar-bg">
          <div className="navbar nav_title" >
            <a className="site_title">
              {/* <i className="fa fa-paw"></i> */}
              <img src={TilliLogo} alt="..." style={{ width: "25%" }} />
            </a>
          </div>

          <div className="clearfix"></div>

          {/* <!-- menu profile quick info --> */}
          <div className="profile clearfix">
            <div className="profile_pic">
              <img src={process.env.PUBLIC_URL + '/' + MyConstant.keyList.projectUrl + '/images/user.png'} alt="..." className="img-circle profile_img" />
            </div>
            <div className="profile_info ">
              <span>Welcome,</span>
              <h2>{localStorage.getItem("loggedUsername") === "developer" ? "CIO" : localStorage.getItem("loggedUsername")}</h2>
            </div>
            <div className="clearfix"></div>
          </div>
          {/* <!-- /menu profile quick info --> */}

          {/* <!-- sidebar menu --> */}

          <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
              {/* <h3>General</h3> */}
              {/* <ul className="nav side-menu">
    <li><a><i className="fa fa-home"></i> Home <span className="fa fa-chevron-down"></span></a>
      <ul className="nav child_menu">
        <li><a  onClick={()=>{
          this.setState({pageDisplay:'Level' })
        }}>Level</a></li>
        <li><a
        onClick={()=>{
          this.setState({pageDisplay:'Theme' })
        }} >Theme</a></li>
        <li><a
        onClick={()=>{
          this.setState({pageDisplay:'LevelManager' })
        }}>LevelManager</a></li>
        <li><a
        onClick={()=>{
          this.setState({pageDisplay:'ImageManager' })
        }}>ImageManager</a></li>

      </ul>
    </li>
  </ul> */}

              <ul className="nav side-menu">
                <li >
                  <Link to={"/" + MyConstant.keyList.projectUrl + "/Level"} ><i className="fa fa-level-up icon-color"></i> Module <span className=""></span></Link>
                </li>
              </ul>

              <ul className="nav side-menu">
                <li ><Link to={"/" + MyConstant.keyList.projectUrl + "/Theme"}  ><i className="fa fa-desktop icon-color" ></i> Theme <span className=""></span></Link>
                </li>
              </ul>

              {/*
  <ul className="nav side-menu">
    <li ><Link  to="/LevelManager" ><i className="fa fa-home"></i> Level Manager <span className=""></span></Link>
    </li>
  </ul> */}

              <ul className="nav side-menu">
                <li><Link to={"/" + MyConstant.keyList.projectUrl + "/ImageManager"} ><i className="fa fa-picture-o icon-color"></i> Image Manager <span className=""></span></Link>
                </li>
              </ul>
              {/* <ul className="nav side-menu">
                <li>
                  <Link to={"/" + MyConstant.keyList.projectUrl + "/admin-list"} ><i className="fa fa-users icon-color"></i> Admin <span className=""></span></Link>
                </li>
              </ul> */}
              {/* <ul className="nav side-menu">
                <li>
                  <Link to={"/" + MyConstant.keyList.projectUrl + "/Userlist"} ><i className="fa fa-address-book icon-color"></i> Users <span className=""></span></Link>
                </li>
              </ul> */}
              {/* <ul className="nav side-menu">
                <li><Link to={"/" + MyConstant.keyList.projectUrl + "/analytics"} ><i className="fa fa-line-chart icon-color"></i> Analytics <span className=""></span></Link></li>
              </ul> */}
              <ul className="nav side-menu">
                <li><a><i className="fa fa-language icon-color"></i> Language  <span className="fa fa-chevron-down icon-color"></span></a>
                  <ul className="nav child_menu">
                    <li>
                      <Link to={"/" + MyConstant.keyList.projectUrl + "/languagemaster"}>Language Master <span
                        className=""></span></Link>
                    </li>
                    {localStorage.getItem("userType") == "developer" ? <li key={"jsoncreate"}>
                      <Link to={"/" + MyConstant.keyList.projectUrl + "/jsoncreate"} > Page Json create <span className=""></span></Link>
                    </li> : null}
                    <li>
                      <Link to={"/" + MyConstant.keyList.projectUrl + "/mapping"}> Page Language Mapping<span
                        className=""></span></Link>
                    </li>
                    <li>
                      <Link to={"/" + MyConstant.keyList.projectUrl + "/LevelModule"} >Module Language Mapping<span className=""></span>
                      </Link>
                    </li>

                    <li>
                      <Link to={"/" + MyConstant.keyList.projectUrl + "/languagelevelmapping"} > Level Name Mapping <span className=""></span></Link>
                    </li>

                  </ul>
                </li>
              </ul>
              <ul className="nav side-menu">
                <li>
                  <a href={"/" + MyConstant.keyList.projectUrl} onClick={() => {
                    localStorage.clear()
                  }} ><i className="fa fa-sign-out icon-color"></i> Logout<span className=""></span>
                  </a>
                </li>
              </ul>

            </div>


          </div>

          {/* <!-- /sidebar menu --> */}

          {/* <!-- /menu footer buttons --> */}
          {/* <div className="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="Settings">
              <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
              <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Lock">
              <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Logout" to="login.html">
              <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
            </a>
          </div> */}
          {/* <!-- /menu footer buttons --> */}
        </div>
      </div>

    )

  }
}

export default SideMenu
