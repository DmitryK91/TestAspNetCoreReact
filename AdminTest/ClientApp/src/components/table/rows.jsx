import React from 'react';
import { connect } from 'react-redux';


const Rows = ({ users, columns }) => (
    <div className='contents'>
        {
            users.map((user, index) =>
                <div key={index}>
                    {
                        Object.keys(columns).map((key, index) =>
                            <div key={index}>
                                {
                                    columns[key].build ? columns[key].build(user[key]) : user[key]
                                }
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>
)


const mapStateToProps = (state, ownProps) => ({
    users: state.requestUsers.users,
    columns: ownProps.columns
});

export default connect(mapStateToProps)(Rows);