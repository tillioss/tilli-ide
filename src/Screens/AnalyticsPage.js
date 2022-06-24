import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import MyConstant from "../config/MyConstant";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
// import DropDown from "../Component/DropDown";
import { Line } from "react-chartjs-2";


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
import { doConnect } from '../config/Common';


class AnalyticsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yearSelect: {},
            monthSelect: {},
            daySelect: {},
            dayCount: 31,
            startDate: new Date(), endDate: new Date(),
            sDate: "", eDate: "",
            dateBasedData: [],
            languageDataBased: [],
            basedOnGender: [],
            basedOnAge: [],
            fetchDataResult: false,
            dateBaseXaxis: [],
            dateBaseYaxis: [],
            resLoaderView: false,
            dateBaseGender: { xAxis: [], yAxisMale: [], yAxisFemale: [] },
            dateBaseLanguage: { xAxis: [], yAxisSinhala: [], yAxisTamil: [], yAxisEnglish: [] },
            filterGender: ["male", "female"],
            filterLanguage: ["sinhala", "tamil", "english"],
            filterAge: Array.from({ length: 6 }, (_, i) => i + 5),
            requestType: ""
        }
    }

    async componentDidMount() {
        let ds = await this.formatDate(new Date())
        this.setState({
            sDate: ds,
            eDate: ds
        }, () => {
            this.searchData();
            this.fetchAnalyticsData();
        })
    }


    daysInMonth(month, year) {

        return new Date(year, month, 0).getDate();
    }


    handleSelect(ranges) {
        console.log(ranges);


    }

    formatDate(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
    }

    async fetchAnalyticsData() {
        let postJson = { id: "123" }
        let responseData = await doConnect("fetchAnalytics", "POST", postJson);
        if (responseData.response) {
            let response = JSON.parse(responseData.response)
            var languageDataBased = []
            response.languageBased.map(kval => {
                languageDataBased.push({ name: kval.x, language: parseInt(kval.y) })

            })
            var basedOnGender = []
            response.genderBased.map(kval => {
                basedOnGender.push({ name: kval.x, gender: parseInt(kval.y) })
            })
            var basedOnAge = []
            response.ageBased.map(kval => {
                basedOnAge.push({ name: kval.x, age: parseInt(kval.y) })
            })
            this.setState({
                languageDataBased,
                basedOnGender,
                basedOnAge
            })

        }
    }

    async searchData() {
        let { sDate, eDate, filterAge, filterGender, filterLanguage } = this.state
        this.setState({ resLoaderView: true })
        let type = "";
        if (filterAge.length !== 6 || filterGender.length !== 2 || filterLanguage.length !== 3) {
            type = "filter";
        }
        let postJson = { sDate, eDate, filterAge, filterGender, filterLanguage, id: "123", requestType: type }
        let responseData = await doConnect("fetchFilterAnalytics", "POST", postJson);
        if (responseData.response) {
            console.log(JSON.parse(responseData.response))

            let response = JSON.parse(responseData.response)
            var dateBasedData = []
            var dateBaseXaxis = []
            var dateBaseYaxis = []
            var dateBaseGender = { xAxis: [], yAxisMale: [], yAxisFemale: [] }
            var dateBaseLanguage = { xAxis: [], yAxisSinhala: [], yAxisTamil: [], yAxisEnglish: [] }
            response.dateBased.map(ival => {
                let da = ival.x.split('-')
                let datechg = new Date(parseInt(da[0]), parseInt(da[1]) - 1, parseInt(da[2]),)
                dateBasedData.push({ name: ival.x, date: parseInt(ival.y) })
                dateBaseXaxis.push(ival.x)
                dateBaseYaxis.push(parseInt(ival.y))

            })

            let dateBasedGenderData = response.dateBasedGender;
            dateBasedGenderData.map(ival => {
                dateBaseGender.xAxis.push(ival.x);
                dateBaseGender.yAxisMale.push(ival["y-male"]);
                dateBaseGender.yAxisFemale.push(ival["y-female"]);
            })
            let dateBasedLanguageData = response.dateBasedLanguage;
            dateBasedLanguageData.map(ival => {
                dateBaseLanguage.xAxis.push(ival.x);
                dateBaseLanguage.yAxisSinhala.push(ival["y-sinhala"]);
                dateBaseLanguage.yAxisTamil.push(ival["y-tamil"]);
                dateBaseLanguage.yAxisEnglish.push(ival["y-english"]);
            })


            this.setState({
                dateBasedData,
                fetchDataResult: true,
                dateBaseYaxis,
                dateBaseXaxis,
                resLoaderView: false,
                dateBaseGender,
                dateBaseLanguage,
                requestType: type
            })

        }
    }

    onChange(type, value) {
        let { filterAge, filterGender, filterLanguage } = this.state;

        if (type === "age") {
            value = parseInt(value);
            if (filterAge.includes(value)) {
                let index = filterAge.indexOf(value);
                filterAge.splice(index, 1);
            } else {
                filterAge.push(value)
            }
        } else if (type === "gender") {
            if (filterGender.includes(value)) {
                let index = filterGender.indexOf(value);
                filterGender.splice(index, 1);
            } else {
                filterGender.push(value)
            }
        } else if (type === "language") {
            if (filterLanguage.includes(value)) {
                let index = filterLanguage.indexOf(value);
                filterLanguage.splice(index, 1);
            } else {
                filterLanguage.push(value)
            }
        }

        this.setState({
            filterAge,
            filterGender,
            filterLanguage
        })
    }
    render() {
        let { yearSelect, daySelect, monthSelect, requestType, dayCount, dateBasedData, languageDataBased, basedOnGender, fetchDataResult, dateBaseXaxis, dateBaseYaxis, resLoaderView, dateBaseGender, dateBaseLanguage, basedOnAge, filterGender, filterAge, filterLanguage } = this.state
        let { startDate, endDate } = this.state
        var monthList = [
            { label: "January", value: "January" }, { label: "February", value: "February" }, { label: "March", value: "March" },
            { label: "April", value: "April" }, { label: "May", value: "May" }, { label: "June", value: "June" },
            { label: "July", value: "July" }, { label: "August", value: "August" }, { label: "September", value: "September" },
            { label: "October", value: "October" }, { label: "November", value: "November" }, { label: "November", value: "November" }, { label: "December", value: "December" },
        ]

        var DateList = []
        for (let i = 1; i < dayCount; i++) {
            DateList.push({ label: i, value: i })
        }
        var selectionRange = {
            startDate: startDate,
            endDate: endDate,
            key: 'selection',
        }

        var lineChartData = {
            labels: dateBaseXaxis,
            datasets: [
                {
                    label: 'Users',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#6BC8AE',
                    borderColor: '#6BC8AE',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dateBaseYaxis,
                }
            ]
        };

        var lineChartGenderData = {
            labels: dateBaseGender.xAxis,
            datasets: [
                {
                    label: 'Male',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#03a9f4',
                    borderColor: '#03a9f4',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dateBaseGender.yAxisMale,
                },
                {
                    label: 'Female',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#f36adc',
                    borderColor: '#f36adc',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dateBaseGender.yAxisFemale,
                }
            ]
        };
        var lineChartLanguageData = {
            labels: dateBaseGender.xAxis,
            datasets: [
                {
                    label: 'Sinhala',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#6BC8AE',
                    borderColor: '#6BC8AE',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dateBaseLanguage.yAxisSinhala,
                },
                {
                    label: 'Tamil',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#e91e63',
                    borderColor: '#e91e63',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dateBaseLanguage.yAxisTamil,
                },
                {
                    label: 'English',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#2196f3',
                    borderColor: '#2196f3',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dateBaseLanguage.yAxisEnglish,
                }
            ]
        };
        let barColors = ["#6bc8ae", "#e91e63", "#2196f3", "#03a9f4", "#f36adc"];
        let languageColors = {
            "sinhala": "#6bc8ae",
            "tamil": "#e91e63",
            "english": "#2196f3"
        };
        let genderColors = {
            "male": "#03a9f4",
            "female": "#f36adc"
        };
        return (
            <React.Fragment>
                <div className="container body">
                    <div className="main_container">

                        {/* <!-- Side Menu--> */}
                        <SideMenu />
                        {/* <!-- Side Menu --> */}
                        {/* <!-- top navigation --> */}
                        <TopMenu />
                        {/* <!-- top navigation --> */}

                        {/* <!-- page content --> */}
                        <div className="right_col analytics-page" role="main">
                            <div className="">

                                <div className="clearfix"></div>
                                {/* <!--content --> */}

                                <div className="row my-2">
                                    <div className="col-sm-6">
                                        {
                                            <div className="card">
                                                <div className="card-header">
                                                    Based on Language
                                                </div>
                                                <div className="card-body">
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <BarChart
                                                            data={languageDataBased}
                                                            margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar dataKey="language" fill="#6BC8AE" >
                                                                {
                                                                    languageDataBased.map((entry, index) => (
                                                                        <Cell key={`cell-${index}`} fill={languageColors[entry.name]} />
                                                                    ))
                                                                }
                                                            </Bar>
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-sm-6">
                                        {
                                            <div className="card">
                                                <div className="card-header">
                                                    Based on Gender
                                                </div>
                                                <div className="card-body">
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <BarChart
                                                            data={basedOnGender}
                                                            margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar dataKey="gender" fill="#6BC8AE" >
                                                                {
                                                                    basedOnGender.map((entry, index) => (
                                                                        <Cell key={`cell-${index}`} fill={genderColors[entry.name]} />
                                                                    ))
                                                                }
                                                            </Bar>
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-12">
                                        {
                                            <div className="card">
                                                <div className="card-header">
                                                    Based on Age
                                                </div>
                                                <div className="card-body">
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <BarChart
                                                            data={basedOnAge}
                                                            margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar dataKey="age" fill="#6BC8AE" >
                                                                {
                                                                    basedOnAge.map((entry, index) => (
                                                                        <Cell key={`cell-${index}`} fill={barColors[index % 5]} />
                                                                    ))
                                                                }
                                                            </Bar>
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Based on Date Range
                                    </div>
                                    <div className="card-body">
                                        <div className="row pt-2 pb-2">
                                            <div className="col-sm-3 col-3">
                                                <div className="form-group" style={{ textAlign: 'left' }}>
                                                    <label>Start Date</label>
                                                    <input type="date" id="start" name="trip-start"
                                                        className="form-control"
                                                        value={this.state.sDate}
                                                        onChange={(e) => {
                                                            this.setState({ sDate: e.target.value })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-3 col-3" style={{ textAlign: 'left' }}>
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <input type="date" id="end" name="trip-start"
                                                        value={this.state.eDate}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            this.setState({ eDate: e.target.value })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-3 col-3" style={{ textAlign: 'left' }}>
                                                <div className="form-group">
                                                    <label>Gender</label>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" value="male" checked={filterGender.includes("male")} onChange={(e) => this.onChange("gender", "male")} />
                                                            <label className="form-check-label" >
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" value="female" checked={filterGender.includes("female")} onChange={(e) => this.onChange("gender", "female")} />
                                                            <label className="form-check-label" >
                                                                Female
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 col-3" style={{ textAlign: 'left' }}>
                                                <div className="form-group">
                                                    <label>Language</label>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" value="sinhala" checked={filterLanguage.includes("sinhala")} onChange={(e) => this.onChange("language", "sinhala")} />
                                                            <label className="form-check-label" >
                                                                Sinhala
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" value="tamil" checked={filterLanguage.includes("tamil")} onChange={(e) => this.onChange("language", "tamil")} />
                                                            <label className="form-check-label" >
                                                                Tamil
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" value="tamil" checked={filterLanguage.includes("english")} onChange={(e) => this.onChange("language", "english")} />
                                                            <label className="form-check-label" >
                                                                English
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row py-2">
                                            <div className="col-sm-6 col-3" style={{ textAlign: 'left' }}>
                                                <div className="form-group">
                                                    <label>Age</label>
                                                    <div>
                                                        {
                                                            [5, 6, 7, 8, 9, 10].map((age) => {
                                                                return <div className="form-check form-check-inline" key={age}>
                                                                    <input className="form-check-input" type="checkbox" value={age} checked={filterAge.includes(age)} onChange={(e) => this.onChange("age", age)} />
                                                                    <label className="form-check-label" >
                                                                        {age}
                                                                    </label>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row pt-2 pb-2">
                                            <div className="col-sm-3 col-4"></div>
                                            <div className="col-sm-3 col-2 " style={{ textAlign: "start" }}>
                                                <button type="button" className={'btn btn-primary '} onClick={() => {
                                                    this.searchData()
                                                }} disabled={!resLoaderView ? resLoaderView : resLoaderView} >
                                                    {resLoaderView ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
                                                    Search Data
                                                </button>

                                            </div>
                                        </div>
                                        {
                                            dateBasedData.length != 0 && <React.Fragment>
                                                <div className="card">
                                                    <div className="card-header">
                                                        Users
                                                    </div>
                                                    <div className="card-body">
                                                        <Line data={lineChartData} />
                                                    </div>
                                                </div>
                                                {
                                                    requestType !== "filter" && <React.Fragment>
                                                        <div className="card mt-2">
                                                            <div className="card-header">
                                                                Gender
                                                            </div>
                                                            <div className="card-body">
                                                                <Line data={lineChartGenderData} />
                                                            </div>
                                                        </div>
                                                        <div className="card mt-2">
                                                            <div className="card-header">
                                                                Language
                                                            </div>
                                                            <div className="card-body">
                                                                <Line data={lineChartLanguageData} />
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            </React.Fragment>
                                        }
                                        {basedOnGender.length == 0 && languageDataBased.length == 0 && dateBasedData.length == 0 && fetchDataResult ? <>
                                            <div className="row">
                                                <div className="col-sm-12 text-center">
                                                    <h4>No Results </h4>
                                                </div>
                                            </div>
                                        </> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AnalyticsPage;
