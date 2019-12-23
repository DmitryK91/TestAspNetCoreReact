import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUsers } from '../../actions';
import { history, sort } from '../../utils';
import { ArrowDown, ArrowUp, Filter } from '../../css/images';


class Headers extends Component {

    state = {
        currentPage: null,
        sortedColumn: null,
        filters: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const currentPage = nextProps.match.params.page;

        if (!currentPage) {
            history.push(`/1`);
            return null;
        }

        if (prevState.currentPage !== currentPage) {
            const { itemsCount, getUsers } = nextProps;
            const { filters, sortedColumn } = prevState;

            getUsers(currentPage, itemsCount, sortedColumn, filters);
        }

        return { currentPage }
    }

    handleSort = (key) => {
        const { itemsCount, getUsers } = this.props;
        const { sortedColumn, filters, currentPage } = this.state;

        var newSort = {};
        newSort[key] = (!sortedColumn || sortedColumn[key] !== sort.ASC) ? sort.ASC : sort.DESC;

        getUsers(currentPage, itemsCount, newSort, filters);

        this.setState({
            sortedColumn: newSort
        });
    }

    handleFilter = (e) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();

        const { itemsCount, getUsers } = this.props;
        const { sortedColumn, filters } = this.state;

        getUsers(1, itemsCount, sortedColumn, filters);

        history.push('/1');
    }

    handleChangeText = (key, e) => {
        e.preventDefault();

        const val = e.target.value;

        const { filters } = this.state;

        var newFilter = filters ? filters.filter(f => f.Item1 !== key) : [];
        newFilter = [...newFilter, { Item1: key, Item2: val }];

        this.setState({ filters: newFilter });
    }

    handleClearFilter = (key, e) => {
        e.preventDefault();

        const { itemsCount, getUsers } = this.props;
        const { sortedColumn, filters } = this.state;
        var newFilter = filters ? filters.filter(f => f.Item1 !== key) : null;
        newFilter = newFilter.length ? newFilter : null;

        getUsers(1, itemsCount, sortedColumn, newFilter);

        this.setState({ filters: newFilter });

        history.push('/1');
    }

    render() {

        const { columns } = this.props;
        const { sortedColumn, filters } = this.state;

        return (
            <div className='headers'>
                {
                    Object.keys(columns).map((key, index) => {

                        const filter = filters ? filters.find(f => f.Item1 === key) : null;
                        const filterText = filter ? filter.Item2 : '';

                        return (
                            <div key={index}>

                                <div onClick={() => this.handleSort(key)}>
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
                                        onChange={e => this.handleChangeText(key, e)}
                                        onKeyPress={e => this.handleFilter(e)}
                                    />
                                    <button
                                        onClick={e => this.handleClearFilter(key, e)}
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
}


const mapStateToProps = (state, ownProps) => ({
    columns: ownProps.columns,
    itemsCount: state.requestUsers.itemsCount
});

const mapDispatchToProps = {
    getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Headers));