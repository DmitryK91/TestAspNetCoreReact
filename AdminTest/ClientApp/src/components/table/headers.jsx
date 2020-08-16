import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GET } from '../../actions';
import { history, sort } from '../../utils';
import { ArrowDown, ArrowUp, Filter } from '../../css/images';


const Headers = ({ GET, columns, visibleCount, match: { params: { page } } }) => {

    const [currentPage, setCurrentPage] = useState();
    const [sortedColumn, setSortedColumn] = useState();
    const [filters, setFilters] = useState();


    useEffect(() => {

        if (!page) {
            history.push(`/1`);
            return;
        }

        if (currentPage !== page) {
            setCurrentPage(page);
            GET(page, visibleCount, sortedColumn, filters);
        }

    }, [page, GET, visibleCount, sortedColumn, filters, currentPage]);


    const handleSort = useCallback((key) => {

        var newSort = {};
        newSort[key] = (!sortedColumn || sortedColumn[key] !== sort.ASC) ? sort.ASC : sort.DESC;

        setSortedColumn(newSort);

        if (currentPage !== '1')
            history.push('/1');
        else
            GET(1, visibleCount, newSort, filters);

    }, [GET, currentPage, sortedColumn, visibleCount, filters]);


    const handleFilter = useCallback((e) => {

        if (e.key !== 'Enter') return;

        e.preventDefault();

        if (currentPage !== '1')
            history.push('/1');
        else
            GET(1, visibleCount, sortedColumn, filters);

    }, [GET, currentPage, sortedColumn, visibleCount, filters]);


    const handleChangeText = useCallback((key, e) => {

        e.preventDefault();

        const val = e.target.value;

        var newFilter = filters ? filters.filter(f => f.Item1 !== key) : [];
        newFilter = [...newFilter, { Item1: key, Item2: val }];

        setFilters(newFilter);

    }, [filters]);


    const handleClearFilter = useCallback((key, e) => {

        e.preventDefault();

        var newFilter = filters ? filters.filter(f => f.Item1 !== key) : null;
        newFilter = newFilter.length ? newFilter : null;

        setFilters(newFilter);

        if (currentPage !== '1')
            history.push('/1');
        else
            GET(1, visibleCount, sortedColumn, newFilter);

    }, [GET, filters, currentPage, sortedColumn, visibleCount]);


    return (
        <div className='headers'>
            {
                Object.keys(columns).map((key, index) => {

                    const filter = filters ? filters.find(f => f.Item1 === key) : null;
                    const filterText = filter ? filter.Item2 : '';

                    return (
                        <div key={index}>

                            <div onClick={() => handleSort(key)}>
                                {columns[key].text}
                                {
                                    (!!sortedColumn && !!sortedColumn[key]) && (sortedColumn[key] === sort.ASC ? ArrowDown() : ArrowUp())
                                }
                            </div>

                            <div className='filter'>
                                <input
                                    type='text'
                                    placeholder='Введите тест и нажмите enter'
                                    value={filterText}
                                    onChange={e => handleChangeText(key, e)}
                                    onKeyPress={e => handleFilter(e)}
                                />
                                <button
                                    onClick={e => handleClearFilter(key, e)}
                                    disabled={!filter}
                                >
                                    {Filter(filter ? 'black' : 'gray')}
                                    <span className="tooltiptext">Сброс фильтра</span>
                                </button>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = (state, ownProps) => ({
    columns: ownProps.columns,
    visibleCount: state.requestStudents.visibleCount
});

const mapDispatchToProps = {
    GET
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Headers));