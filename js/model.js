import { FETCH_URL, URL, KEY } from './config';
export const state = {
  image: [],
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
