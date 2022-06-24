import React from 'react';

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
                            <a className="page-link" onClick={() =>  movePage('prev') }>Previous</a>
                        </li>
                        {
                            pagination.map((page, index) => {
                                return <li key={index} className={`page-item ${currentPage == page ? "active" : ((page === 0 || page === "...") ? "disabled" : "") }`}><a className="page-link" onClick={ () => movePage(page) }>{(page === 0 || page === "...") ? "..." : page}</a></li>
                            })
                        }
                        
                        <li className={`page-item ${next ? "" : "disabled"}`}>
                            <a className="page-link" onClick={() =>  movePage('next') }>Next</a>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}
