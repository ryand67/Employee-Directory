import axios from 'axios';

const obj = {
    search: () => {
        return axios.get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
    }
}

export default obj;