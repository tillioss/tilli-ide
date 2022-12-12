import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Login from './Screens/Login';
import Dashbord from './Screens/Menu/Dashbord';
import Level from './Screens/Level';
import Theme from './Screens/Theme';
import LevelManager from './Screens/LevelManager';
import ImageManager from './Screens/ImageManager';
// import UserList from './Screens/UserList';
// import AttemptDetails from './Screens/AttemptDetails';

import LanguageScreen from './Screens/LanguageScreen';
import LanguageMaster from './Screens/LanguageMaster';
import LanguageMapping from './Screens/LanguageMapping';
import LevelManagerLanguage from './Screens/LevelManagerLanguage';
import LevelModule from './Screens/LevelModule';
import Languagelevelmapping from './Screens/Languagelevelmapping';

//Module Management

import ModuleManager from './Screens/ModuleManagement/ModuleManager';
import ModuleManagerIDE from './Screens/ModuleManagement/ModuleManagerIDE';
import LanguageJsonMapping from './Screens/ModuleManagement/LanguageJsonMapping';

import './App.css';
import './TilliWeb.css';
import MyConstant from './config/MyConstant';
import AdminList from './Screens/AdminList';
import ManageUsers from './Screens/ManageUsers';
import Workspace from './Screens/User/Workspace';
import Roles from './Screens/User/Roles';
import Pages from './Screens/User/Pages';
import Users from './Screens/User/Users';
import Menu from './Screens/Menu/Menu';


import Builder from './Screens/ModuleManagement/ThemeBuilder/Builder';
import ThemeViewer from './Screens/ModuleManagement/ThemeBuilder/ThemeViewer';
import ModuleManagerThemeIDE from './Screens/ModuleManagement/ThemeBuilder/ModuleManagerThemeIDE';
import GodotPreview from './Screens/GodotPreview';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuDisplay: false,
            menuOpen: true
        }
    }
    componentDidMount() {
        this.onRouteChanged();
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        let pathname = this.props.location.pathname;
        let menuDisplay = false;
        let menuIncludePaths = [
            "/Dashboard",
            "/Level",
            "/Theme",
            "/LevelManager",
            "/ImageManager",
            "/admin-list",
            "/jsoncreate",
            "/languagemaster",
            "/mapping",
            "/ModuleLanguageMapping",
            "/LevelModule",
            "/languagelevelmapping",
            "/modulemanager",
            "/module-manager-ide",
            "/module-manager-theme-ide",
            "/ModuleLanguageJson",
            "/manage-users",
            "/users",
            "/roles",
            "/workspace",
            "/pages",
            "/theme-builder",
        ];

        menuIncludePaths.forEach(element => {
            if (pathname.includes(element)) {
                menuDisplay = true
            }
        });


        let menuOpen = true;
        if (pathname.includes("/tilli/module-manager-ide") || pathname.includes("/tilli/module-manager-theme-ide") || pathname.includes("/tilli/theme-builder")) {
            menuOpen = false;
        }
        this.setState({
            menuDisplay,
            menuOpen
        })
    }

    render() {
        let { menuDisplay, menuOpen } = this.state;
        return (
            <div className="App">
                <div className="app-content">

                    <Menu menuDisplay={menuDisplay} menuOpen={menuOpen}>
                        <Switch>
                            <Route exact path={"/" + MyConstant.keyList.projectUrl} render={(props) =>
                                <Login {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Dashboard"} render={(props) =>
                                <Dashbord {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Level"} render={(props) =>
                                <Level {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Theme"} render={(props) =>
                                <Theme {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/LevelManager/:levelid?"} render={(props) =>
                                <LevelManager {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/ImageManager"} render={(props) =>
                                <ImageManager {...props} />
                            } />
                            {/* <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Userlist"} render={(props) =>
                    <UserList {...props} />
                } /> */}
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/admin-list"} render={(props) =>
                                <AdminList {...props} />
                            } />
                            {/* <Route exact path={"/" + MyConstant.keyList.projectUrl + "/viewattempts/:Userid?"} render={(props) =>
                    <AttemptDetails {...props} />
                } /> */}
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/jsoncreate"} render={(props) =>
                                <LanguageScreen {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/languagemaster"} render={(props) =>
                                <LanguageMaster {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/mapping"} render={(props) =>
                                <LanguageMapping {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/ModuleLanguageMapping/:levelid?"} render={(props) =>
                                <LevelManagerLanguage {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/LevelModule"} render={(props) =>
                                <LevelModule {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/languagelevelmapping"} render={(props) =>
                                <Languagelevelmapping {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/modulemanager/:levelid?"} render={(props) =>
                                <ModuleManager {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/module-manager-ide/:levelid?"} render={(props) =>
                                <ModuleManagerIDE {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/module-manager-theme-ide/:levelid?"} render={(props) =>
                                <ModuleManagerThemeIDE {...props} />
                            } />

                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/ModuleLanguageJson/:levelid?"} render={(props) =>
                                <LanguageJsonMapping {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/manage-users"} render={(props) =>
                                <ManageUsers {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/roles"} render={(props) =>
                                <Roles {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/pages"} render={(props) =>
                                <Pages {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/users"} render={(props) =>
                                <Users {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/workspace"} render={(props) =>
                                <Workspace {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/theme-builder/:themeId"} render={(props) =>
                                <Builder {...props} />
                            } />
                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/theme-viewer/:themeId"} render={(props) =>
                                <ThemeViewer {...props} />
                            } />

                            <Route exact path={"/" + MyConstant.keyList.projectUrl + "/godotpreview/:themeId"} render={(props) =>
                                <GodotPreview {...props} />
                            } />

                        </Switch>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
