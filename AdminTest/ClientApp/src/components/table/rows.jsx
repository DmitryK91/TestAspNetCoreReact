import React from 'react';
import { connect } from 'react-redux';


const Rows = ({ students, columns }) => (
    <div className='contents'>
        {
            students?.map((student, index) =>
                <div key={index}>
                    {
                        Object.keys(columns).map((key, index) =>
                            <div key={index}>
                                {
                                    columns[key].build ? columns[key].build(student) : student[key]
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
    students: state.requestStudents.students,
    columns: ownProps.columns
});

export default connect(mapStateToProps)(Rows);