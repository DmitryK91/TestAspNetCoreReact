import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { changeItemsCount } from '../../actions';


const Pages = ({ pagesCount, match, itemsCount, changeItemsCount }) => {

    const currentPage = Number(match.params.page);
    const linksCount = 5;

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    var start = currentPage - linksCount < 0 ? 0 : currentPage - linksCount;
    var end = start + (linksCount * 2);

    start = end > pagesCount ? pagesCount - 10 : start;
    end = end > pagesCount ? pagesCount : end;

    const pages = new Array(pagesCount).fill(1).slice(start, end);

    return (
        <div>
            <div className='page-links'>
                {
                    currentPage > 1 &&
                    <>
                        <Link to={`/${1}`}>
                            {'<<'}
                        </Link>
                        <Link to={`/${prevPage}`}>
                            {'<'}
                        </Link>
                    </>
                }

                {start > 1 && <> ... </>}

                {
                    pages.map((item, index) => {

                        const page = index + 1 + start;

                        return page === currentPage ?
                            <div key={index}>
                                {page}
                            </div> : (
                                <Link key={index} to={`/${page}`}>
                                    {page}
                                </Link>
                            )
                    })
                }

                {end < pagesCount && <> ... </>}

                {
                    currentPage < pagesCount &&
                    <>
                        <Link to={`/${pagesCount}`}>
                            {'>>'}
                        </Link>
                        <Link to={`/${nextPage}`}>
                            {'>'}
                        </Link>
                    </>
                }
            </div>

            <div style={{ textAlign: 'center' }}>
                Элементов на следующей странице:
                <input
                    type='number'
                    value={itemsCount}
                    onChange={(e) => {
                        e.preventDefault();
                        changeItemsCount(e.target.value);
                    }}
                />
            </div>

        </div>
    )
}


const mapStateToProps = (state, ownProps) => ({
    pagesCount: state.requestUsers.pagesCount,
    itemsCount: state.requestUsers.itemsCount
});

const mapDispatchToProps = {
    changeItemsCount
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pages));