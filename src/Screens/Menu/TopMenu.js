import React from 'react';
import { Link } from "react-router-dom";
import image1 from '../../images/Teqbahn_logo1.png';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <React.Fragment>

        <div className="top_nav">
          <div className="nav_menu">
            <div className="nav toggle">
              <Link id="menu_toggle"><i className="fa fa-bars"></i></Link>
            </div>
            <img src={image1} width="220px" height="90px" style={{ float: "right" }} alt="loading" />
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default TopMenu
