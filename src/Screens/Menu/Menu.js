import React from "react";
import { Link, withRouter } from "react-router-dom";
import MyConstant from "../../config/MyConstant";
import logo from "../../images/logos.png"
import teqbahnLogo from '../../images/teqbahn.png';
import { ToastContainer } from 'react-toastify';
import { doConnect } from "../../config/Common";

let intervalId;
class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: true,
            toggleMenu: [],
            errors: [],
            userListOption: [],
            pageAccess: [],
            developerLogin: false,
            logged_UserName: ""
        }
    }

    componentDidMount() {
        this.getPageAccess();
        let logged_UserName = localStorage.getItem("loggedUsername");
        let { menuOpen } = this.props;
        if (menuOpen !== undefined) {
            this.setState({
                menuOpen,
                logged_UserName
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menuOpen !== prevProps.menuOpen) {
            let { menuOpen } = this.props;
            if (menuOpen !== undefined) {
                this.setState({
                    menuOpen
                })
            }
        }
    }
    async getPageAccess() {
        let userType = localStorage.getItem("userType");
        let loginId = localStorage.getItem("loginId");
        let postJson = { sessionId: '123', userId: loginId };
        let responseData = await doConnect("getRoleAccess", "POST", postJson);
        let result = responseData.result;
        let pageAccess = [];
        let routeAccess = ["/Dashboard"];
        Object.keys(result).map((pageId) => {
            pageAccess.push(result[pageId].title)
            routeAccess.push(result[pageId].route)
            return true
        })
        let accessPage = false;
        let pathname = this.props.location.pathname;
        routeAccess.forEach(element => {
            if (pathname.includes(element)) {
                accessPage = true
            }
        });

        if (accessPage || userType === "developer") {
            this.setState({
                pageAccess
            }, () => {
                this.getUsers()

                this.setState({
                    developerLogin: userType === "developer"
                })
            })
        } else {

        }
    }

    async getUsers() {
        let loginId = localStorage.getItem("loginId");
        let postJson = { sessionId: '123', pageLimit: 100, noOfPage: 1 };
        let responseData = await doConnect("getMembers", "POST", postJson);
        let result = responseData.result;
        let userListOption = [];
        Object.keys(result).map((option) => {
            if (loginId !== option) {
                userListOption.push({ value: option, label: result[option].name + " - " + result[option].email })
            }
            return true
        })

        this.setState({
            userListOption
        })
    }

    componentWillUnmount() {
        clearInterval(intervalId);
    }



    menuToggle(type) {
        let { toggleMenu } = this.state;
        if (toggleMenu.includes(type)) {
            const index = toggleMenu.indexOf(type);
            toggleMenu.splice(index, 1);
        } else {
            toggleMenu.push(type);
        }

        this.setState({
            toggleMenu
        })
    }
    logout(e) {
        e.preventDefault();
        localStorage.removeItem("userType");
        localStorage.removeItem("loggedUsername");
        localStorage.removeItem("loginId");
        window.location = '/' + MyConstant.keyList.projectUrl
    }
    render() {
        let { menuDisplay } = this.props
        let { menuOpen, toggleMenu, pageAccess, developerLogin, logged_UserName } = this.state;
        return menuDisplay ? <div className="header">
            <div className="top-header">
                <div className="logo">
                    <img src={logo} className="" alt="loading" />
                </div>
                <div className="menu-toggle" onClick={() => {
                    this.setState({
                        menuOpen: !menuOpen
                    })
                }}>
                    <i className="fa fa-bars"></i>
                </div>
                <div className="pr-5">
                    <span className="">
                        <label style={{ color: "#fff", fontFamily: "system-ui", fontSize: 16, fontWeight: "bold" }}>UserName : </label>
                    </span>
                    <span className="">
                        <label style={{ color: "#ffcc35", fontFamily: "system-ui", fontSize: 16, paddingLeft: 4, fontWeight: "bold" }}>{logged_UserName}</label>
                    </span>
                </div>
                <div className="teqbahn-logo">
                    <img src={teqbahnLogo} className="" alt="loading" />
                </div>
            </div>
            <ToastContainer />
            <div className="content">
                {
                    menuOpen && <div className="left-header">
                        <div className="menu-content">
                            <ul className="menu">
                                <li>
                                    <Link to={"/" + MyConstant.keyList.projectUrl + "/Dashboard"} >
                                        <span className="link-icon"><i className="fa fa-home"></i></span>
                                        <span className="link-text">Dashboard</span>
                                    </Link>
                                </li>
                                {
                                    (pageAccess.includes("Module") || developerLogin) && <li>
                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/Level"} >
                                            <span className="link-icon"><i className="fa fa-level-up"></i></span>
                                            <span className="link-text">Module</span>
                                        </Link>
                                    </li>
                                }

                                {
                                    (pageAccess.includes("Theme") || developerLogin) && <li>
                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/Theme"} >
                                            <span className="link-icon"><i className="fa fa-desktop"></i></span>
                                            <span className="link-text">Theme</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    (pageAccess.includes("Image Manager") || developerLogin) && <li>
                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/ImageManager"} >
                                            <span className="link-icon"><i className="fa fa-picture-o"></i></span>
                                            <span className="link-text">Image Manager</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    (developerLogin || pageAccess.includes("Language Master") || pageAccess.includes("Page JSON create") || pageAccess.includes("Page Language Mapping") || pageAccess.includes("Module Language Mapping") || pageAccess.includes("Level Name Mapping")) && <React.Fragment>
                                        <li onClick={() => this.menuToggle("language")}>
                                            <span className="link-icon"><i className="fa fa-language"></i></span>
                                            <span className="link-text">Language</span>
                                            <span className="float-right">
                                                <span className="arrow">
                                                    <i className={`fa ${toggleMenu.includes("language") ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
                                                </span>
                                            </span>
                                        </li>
                                        {
                                            toggleMenu.includes("language") && <ul className="sub-menu">
                                                {
                                                    (pageAccess.includes("Language Master") || developerLogin) && <li>
                                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/languagemaster"}>
                                                            # Language Master
                                                        </Link>
                                                    </li>
                                                }
                                                {
                                                    (pageAccess.includes("Page JSON create") || developerLogin) && <li>
                                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/jsoncreate"}>
                                                            # Page JSON create
                                                        </Link>
                                                    </li>}
                                                {
                                                    (pageAccess.includes("Page Language Mapping") || developerLogin) && <li>
                                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/mapping"}>
                                                            # Page Language Mapping
                                                        </Link>
                                                    </li>}
                                                {
                                                    (pageAccess.includes("Module Language Mapping") || developerLogin) && <li>
                                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/LevelModule"}>
                                                            # Module Language Mapping
                                                        </Link>
                                                    </li>}
                                                {
                                                    (pageAccess.includes("Level Name Mapping") || developerLogin) && <li>
                                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/languagelevelmapping"}>
                                                            # Level Name Mapping
                                                        </Link>
                                                    </li>}
                                            </ul>
                                        }
                                    </React.Fragment>
                                }

                                {
                                    developerLogin && <React.Fragment>
                                        <li>
                                            <Link to={"/" + MyConstant.keyList.projectUrl + "/roles"} >
                                                <span className="link-icon"><i className="fa fa-users"></i></span>
                                                <span className="link-text">Roles</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/" + MyConstant.keyList.projectUrl + "/users"} >
                                                <span className="link-icon"><i className="fa fa-user"></i></span>
                                                <span className="link-text">Users</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/" + MyConstant.keyList.projectUrl + "/pages"} >
                                                <span className="link-icon"><i className="fa fa-file"></i></span>
                                                <span className="link-text">Pages</span>
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                }
                                {
                                    (developerLogin || pageAccess.includes("Machine Learning Demo")) && <li>
                                        <Link to={"/" + MyConstant.keyList.projectUrl + "/machinelearning"} >
                                            <span className="link-icon"><i className="fa fa-file"></i></span>
                                            <span className="link-text">Machine Learning Demo</span>
                                        </Link>
                                    </li>
                                }

                                <li>
                                    <Link to="#" onClick={(e) => this.logout(e)} >
                                        <span className="link-icon"><i className="fa fa-sign-out"></i></span>
                                        <span className="link-text">Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                {this.props.children}
            </div>
        </div> : this.props.children;
    }
}
export default withRouter(Menu);
