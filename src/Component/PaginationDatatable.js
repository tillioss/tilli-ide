import React from "react";
import Pagination from "./Pagination";
import { doConnect, pageNumbers } from "../config/Common";

export default class PaginationDatatable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: [],
            pageLimit: 10,
            noOfPage: 1,
            pagination: [],
            prev: false, 
            next: false, 
        }
    }

    componentDidMount() {
        this.getList()
    }

    componentDidUpdate(prevProps) {
        if (this.props.domain !== prevProps.domain || this.props.event !== prevProps.event || this.props.refresh !== prevProps.refresh) {
            this.getList()
        }
    }

    async getList() {
        let { domain, event, data } = this.props;
        if (typeof domain !== "undefined" && typeof event !== "undefined") {
            let { pageLimit, noOfPage } = this.state;
            let postJson = { sessionId: '123', pageLimit, noOfPage };
            let responseData = await doConnect(event, "POST", postJson);
            let value = [];
            let result = responseData.result;
            console.log("result", responseData)
            Object.keys(result).map((key, index) => {
                let keyData = result[key];
                value[index] = [];
                data.map((column, columnIndex) => {
                    let input = "";
                    if (typeof column.selector !== "undefined") {
                        input = keyData[column.selector];
                    } else if (typeof column.cell !== "undefined") {
                        input = column.cell(keyData)
                    }
                    value[index][columnIndex] = input;
                    return true
                })
                return true
            })

            let next = false;
            let prev = false;

            let totalResult = responseData.totalResult
            let currentResult = noOfPage * pageLimit;
            if (currentResult < totalResult) {
                next = true;
            }
            if (noOfPage > 1) {
                prev = true;
            }
            let pageCount = Math.ceil(totalResult / pageLimit);
            let pagination = pageNumbers(pageCount, noOfPage, 5);
            this.setState({
                value,
                pagination,
                next, 
                prev
            })
        }
    }

    movePage(page) {
        let pageNo = page
        if (page === "next") {
            if (this.state.next) {
                pageNo = this.state.noOfPage + 1;
            }
        } else if (page === "prev") {
            if (this.state.prev) {
                pageNo = this.state.noOfPage - 1;
            }
        }

        if (pageNo !== "next" && pageNo !== "prev") {
            this.setState({
                noOfPage: pageNo,
                processing: true
            }, () => {
                this.getList();
            })
        }
    }

    render() {
        let { data } = this.props;
        let { value, pagination, next, prev, noOfPage } = this.state;
        return <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {
                            data.map((row, index) => {
                                return <th key={index}>{row.column}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        value.length > 0 ? value.map((row, index) => {
                            return <tr key={index}>
                                {
                                    data.map((column, columnIndex) => {
                                        return <td key={columnIndex}>{value[index][columnIndex]}</td>
                                    })
                                }
                            </tr>
                        }) : <tr>
                            <td className="text-center" colSpan={data.length}>No record(s) found.</td>
                        </tr>
                    }
                </tbody>
            </table>
            <Pagination
                pagination={pagination}
                currentPage={noOfPage}
                prev={prev}
                next={next}
                movePage={(type) => {
                    this.movePage(type)
                }} />
        </div>;
    }
}
