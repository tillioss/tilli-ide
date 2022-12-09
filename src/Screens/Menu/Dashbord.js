import React from 'react';


class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false, pageDisplay: 'ImageManager'
    }
  }


  render() {
    return (
      <React.Fragment>
        <div className="main-content">
          <div className="right_col" role="main">
            <div className="">

              <div className="clearfix"></div>

              <div className="row">
                <div className="col-md-12 col-sm-12  ">
                  <div className="x_panel">
                    <div className="x_title">
                      <h2>Dashboard</h2>
                      <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                      Dashboard
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /page content --> */}

        </div>

      </React.Fragment>

    );

  }

}

export default Dashbord;
