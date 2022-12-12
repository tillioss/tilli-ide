import React from 'react';
import { Link } from "react-router-dom";


export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let { pagination, prev, next, movePage, currentPage } = this.props;
        return (
            <React.Fragment>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${prev ? "" : "disabled"}`}>
                            <Link className="page-link" onClick={() => movePage('prev')}>Previous</Link>
                        </li>
                        {
                            pagination.map((page, index) => {
                                return <li key={index} className={`page-item ${currentPage === page ? "active" : ((page === 0 || page === "...") ? "disabled" : "")}`}><Link className="page-link" onClick={() => movePage(page)}>{(page === 0 || page === "...") ? "..." : page}</Link></li>
                            })
                        }

                        <li className={`page-item ${next ? "" : "disabled"}`}>
                            <Link className="page-link" onClick={() => movePage('next')}>Next</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}
