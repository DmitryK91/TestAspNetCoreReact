import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { changeVisibleCount } from '../../actions';
import Table from '../table';
import { Button, Alert } from 'reactstrap';
import Student from '../student';


const Pages = ({ pagesCount, match: { params: { page } }, visibleCount, changeVisibleCount, itemsCount, alert }) => {

    const currentPage = Number(page);
    const linksCount = 5;

    const [isVisibleAlert, setIsVisibleAlert] = useState(false);

    const timer = useRef();

    useEffect(() => {

        if (alert.color && alert.message) {
            setIsVisibleAlert(true);

            timer.current = setTimeout(() =>
                setIsVisibleAlert(false),
                5000
            );
        }

    }, [alert]);

    const start = currentPage < linksCount ? 0 :
        (
            currentPage - 1 + linksCount > pagesCount ? pagesCount - linksCount :
                currentPage - Math.floor(linksCount / 2) - 1
        );

    const pages = new Array(pagesCount).fill(1).map((item, ind) => ind).slice(start, start + linksCount);

    const pageHelper = useCallback((page, text) =>
        page === currentPage ?
            <div key={text}>
                {text}
            </div> :
            <Link
                key={text}
                to={`/${page}`}
            >
                {text}
            </Link>,

        [currentPage]);


    return (
        <>

            <Alert
                color={alert.color}
                isOpen={isVisibleAlert}
                toggle={() => setIsVisibleAlert(!isVisibleAlert)}
            >
                {alert.message}
            </Alert>

            <div className='page-header'>

                <div>
                    <span>Всего студентов:</span>
                    {itemsCount}
                </div>

                <Student
                    text={
                        <Button color="primary" >
                            {'Добавить'}
                        </Button>
                    }
                />

            </div>

            <Table />

            <div>
                {
                    pagesCount > 1 &&
                    <div className='page-links'>
                        {
                            currentPage > 1 &&
                            <>
                                {pageHelper(1, '<<')}
                                {pageHelper(currentPage - 1, '<')}
                            </>
                        }

                        {start > 1 && <> ... </>}

                        {pages.map(item => pageHelper(item + 1, item + 1))}

                        {start < pagesCount - linksCount && <> ... </>}

                        {
                            currentPage < pagesCount &&
                            <>
                                {pageHelper(currentPage + 1, '>')}
                                {pageHelper(pagesCount, '>>')}
                            </>
                        }
                    </div>
                }

                <div style={{ textAlign: 'center' }}>
                    Элементов на следующей странице:
                    <input
                        type='number'
                        value={visibleCount}
                        onChange={(e) => {
                            e.preventDefault();
                            changeVisibleCount(e.target.value);
                        }}
                    />
                </div>

            </div>
        </>
    )
}


const mapStateToProps = (state, ownProps) => ({
    pagesCount: state.requestStudents.pagesCount,
    visibleCount: state.requestStudents.visibleCount,
    itemsCount: state.requestStudents.itemsCount,
    alert: state.requestStudents.alert
});

const mapDispatchToProps = {
    changeVisibleCount
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pages));