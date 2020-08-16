import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { Table, Label, Input, FormFeedback } from 'reactstrap';


const Body = ({ student, setStudent }) => {


    const firstNameValid = useMemo(() =>
        student?.firstName && student.firstName.length < 40 ? { valid: true } : { invalid: true },
        [student]
    );

    const lastNameValid = useMemo(() =>
        student?.lastName && student.lastName.length < 40 ? { valid: true } : { invalid: true },
        [student]
    );

    const patronymicValid = useMemo(() =>
        !student?.patronymic ? {} : (student.patronymic.length < 60 ? { valid: true } : { invalid: true }),
        [student]
    );

    const uniqIDValid = useMemo(() =>
        !student?.uniqID ? {} : (student.uniqID.length < 16 && student.uniqID.length > 6 ? { valid: true } : { invalid: true }),
        [student]
    );


    return (
        <Table>
            <tbody>

                <tr>
                    <th>
                        <Label for="firstName">
                            {'Имя'}
                        </Label>
                    </th>
                    <td>
                        <Input
                            id='firstName'
                            value={student?.firstName ?? ''}
                            {...firstNameValid}
                            onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                        />
                        <FormFeedback>required, максимальная длина 40 символов</FormFeedback>
                    </td>
                </tr>

                <tr>
                    <th>
                        <Label for="lastName">
                            {'Фамилия'}
                        </Label>
                    </th>
                    <td>
                        <Input
                            id='lastName'
                            value={student?.lastName ?? ''}
                            {...lastNameValid}
                            onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                        />
                        <FormFeedback>required, максимальная длина 40 символов</FormFeedback>
                    </td>
                </tr>

                <tr>
                    <th>
                        <Label for="patronymic">
                            {'Отчество'}
                        </Label>
                    </th>
                    <td>
                        <Input
                            id='patronymic'
                            value={student?.patronymic ?? ''}
                            {...patronymicValid}
                            onChange={(e) => setStudent({ ...student, patronymic: e.target.value })}
                        />
                        <FormFeedback>not required, максимальная длина 60 символов</FormFeedback>
                    </td>
                </tr>

                <tr>
                    <th>
                        <Label for="sex">
                            {'Пол'}
                        </Label>
                    </th>
                    <td>
                        <form id='sex'>
                            <label>
                                {'Муж.'}
                                <input
                                    type='radio'
                                    value={1}
                                    checked={student?.sex === 1}
                                    onChange={(e) => setStudent({ ...student, sex: Number(e.target.value) })}
                                />
                            </label>

                            <label>
                                {'Жен.'}
                                <input
                                    type='radio'
                                    value={0}
                                    checked={student?.sex === 0}
                                    onChange={(e) => setStudent({ ...student, sex: Number(e.target.value) })}
                                />
                            </label>
                        </form >
                    </td>
                </tr>

                <tr>
                    <th>
                        <Label for="firstName">
                            {'Уникальный ID'}
                        </Label>
                    </th>
                    <td>
                        <Input
                            value={student?.uniqID ?? ''}
                            {...uniqIDValid}
                            onChange={(e) => setStudent({ ...student, uniqID: e.target.value })}
                        />
                        <FormFeedback>not required, минимальная длина 6 символов, максимальная длина 16</FormFeedback>
                    </td>
                </tr>

            </tbody>
        </Table>
    )
}


const mapStateToProps = (state, ownProps) => ({
    student: ownProps.data,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setStudent: ownProps.setStudent
});


export default connect(mapStateToProps, mapDispatchToProps)(Body);