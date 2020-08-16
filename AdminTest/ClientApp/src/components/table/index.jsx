import React from 'react'
import Headers from './headers';
import Rows from './rows';
import Student from '../student';


const Table = () => {

    const columns = {
        firstName: {
            text: 'Имя',
            build: (data) => <Student data={data} text={data?.firstName} />
        },
        lastName: {
            text: 'Фамилия',
            build: (data) => <Student data={data} text={data?.lastName} />
        },
        patronymic: {
            text: 'Отчество',
            build: (data) => <Student data={data} text={data?.patronymic} />
        },
        sex: {
            text: 'Пол',
            build: (data) => data.sex ? 'муж.' : 'жен.'
        },
        uniqID: {
            text: 'Уникальный ID'
        }
    }

    return (
        <div className='table'>
            <Headers columns={columns} />
            <Rows columns={columns} />
        </div>
    )
}

export default Table