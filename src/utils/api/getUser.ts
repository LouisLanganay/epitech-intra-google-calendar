import Axios from 'axios';

async function getUser(): Promise<any> {
  console.info('Fetching event slots...');
  const config = {
    'method': 'get',
    'url': process.env.API_BASE_URL + '/user/?format=json',
    'headers': {
      'Cookie': 'user=' + process.env.USER_COOKIE
    }
  };

  const response = await Axios(config).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error(error);
  });

  return response;
};

export default getUser;
