import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { EDIT, DELETE, ADD } from '../../actions';

import Body from './body';


const Student = ({ text, data, EDIT, DELETE, ADD }) => {

    const [student, setStudent] = useState();
    const [isVisible, setIsVisible] = useState(false);


    const toggle = useCallback(() => {

        setIsVisible(!isVisible);
        setStudent(data ?? { sex: 1 });

    }, [isVisible, data]);


    const handleDelete = useCallback(() => {

        setIsVisible(!isVisible);
        DELETE(data.id)

    }, [isVisible, data, DELETE]);


    const handleSave = useCallback(() => {

        setIsVisible(!isVisible);
        data ? EDIT(student) : ADD(student)

    }, [isVisible, data, EDIT, ADD, student]);


    return (
        <>
            <span
                className='link'
                onClick={() => toggle()}
            >
                {text}
            </span>

            <Modal isOpen={isVisible} toggle={() => toggle()}>

                <ModalHeader toggle={() => toggle()}>
                    {`${data ? 'Редактирование' : 'Добавление'} ${data?.firstName ?? ''} ${data?.lastName ?? ''} ${data?.patronymic ?? ''} ${data?.uniqId ?? ''}`}
                </ModalHeader>

                <ModalBody>
                    <Body data={student} setStudent={setStudent} />
                </ModalBody>

                <ModalFooter>

                    {
                        data &&
                        <Button
                            color="danger"
                            onClick={(e) => handleDelete()}
                        >
                            {'Удалить'}
                        </Button>
                    }

                    <Button
                        color="primary"
                        onClick={(e) => handleSave()}
                    >
                        {'Сохранить'}
                    </Button>

                    <Button
                        color="secondary"
                        onClick={() => toggle()}
                    >
                        {'Отмена'}
                    </Button>

                </ModalFooter>

            </Modal>
        </>
    )
}


const mapStateToProps = (state, ownProps) => ({
    data: ownProps.data,
    text: ownProps.text
});

const mapDispatchToProps = {
    EDIT,
    DELETE,
    ADD
};


export default connect(mapStateToProps, mapDispatchToProps)(Student);