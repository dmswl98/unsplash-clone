import { FETCH_URL, URL, KEY } from './config';
export const state = {
  image: [],
  search: {
    query: '',
    results: [],
    page: 1,
    lastPage: '',
    imageCount: '',
  },
};

const createImageObject = function (data) {
  return data.map((img) => {
    return {
      id: img.id,
      imageFile: img.urls.small,
      downloadLink: `${URL}${img.id}/download?force=true`,
      description: img.description ? img.description.trim() : null,
      userProfileLink: img.user.links.html,
      userName: img.user.name,
      userHired: img.user.for_hire,
      userImage: img.user.profile_image.large,
    };
  });
};

export const loadImg = async function (count = 10) {
  try {
    const res = await fetch(`${FETCH_URL}/?count=${count}&client_id=${KEY}`);
    const data = await res.json();
    console.log(data);
    state.image = createImageObject(data);
    console.log(state);
  } catch (err) {
    throw err;
  }
};

export const setCurrentPage = function (page = state.search.page) {
  state.search.page = page;
};

export const loadSearchResults = async function (query, page = 1) {
  try {
    state.search.query = query;
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${KEY}`
    );
    const data = await res.json();
    console.log(data);
    state.search.results = createImageObject(data.results);
    state.search.page = 1;
    state.search.lastPage = data.total_pages;

    let count = (data.total / 1000).toFixed(1);
    const isInteger = count.split('.');
    if (isInteger[1] === '0') {
      count = isInteger[0];
    }
    state.search.imageCount = `${count}k`;
  } catch (err) {
    throw err;
  }
};
