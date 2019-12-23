import React from 'react'
import Headers from './headers';
import Rows from './rows';
import Pages from './pages';


const Table = () => {

    const columns = {
        id: {
            text: 'ID'
        },
        name: {
            text: 'Имя'
        },
        birthDate: {
            text: 'Дата рождения',
            build: (data) => {
                const date = new Date(data);
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };

                return date.toLocaleString('ru', options)
            }
        },
        sex: {
            text: 'Пол',
            build: (data) => data === 1 ? 'муж.' : 'жен.'
        },
        requestCount: {
            text: 'Количество заявок'
        }
    }

    return (
        <div className='table'>
            <div>
                <Headers columns={columns} />
                <Rows columns={columns} />
            </div>

            <Pages />
        </div>
    )
}

export default Table