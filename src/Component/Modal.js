import React, { useEffect } from "react";

const Modal = (props) => {
    const {
        visible,
        heading,
        body,
        footer,
        parentClass,
        size
    } = props;

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        }
    }, []);

    return (
        <React.Fragment>
            {visible ?
                <React.Fragment>
                    <div className={`modal ${parentClass ? parentClass : ""}`} style={{ display: 'block' }}>
                        <div className={`modal-dialog ${size !== undefined ? size : ""}`}>
                            <div className="modal-content">
                                <div className="modal-header theme-bg">
                                    <h5 className="modal-title">{heading}</h5>
                                    <button type="button" className="modal-close" onClick={() => props.closeModal()}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    { body }
                                </div>
                                {
                                    footer &&  <div className="modal-footer">
                                        {footer}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </React.Fragment> : null}
        </React.Fragment>
    );
};


export default Modal;