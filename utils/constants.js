export const selectors = {
  sections: {
    cards: '.content__section-cards',
  },
  profile: {
    name: '.profile__name',
    about: '.profile__about',
    editButton: '.profile__edit-button',
    addButton: '.profile__add-button',
  },
  popups: {
    profile: '#profile',
    avatar: '#avatar',
    newCard: '#new-card',
    removeCard: '#remove-card',
    imagePopup: '#image-popup'
  },
  templates: {
    card: '#card-template',
  },
  year: '#year',
};

export const tripleten = {
  baseURL: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    "Authorization": "52220422-faea-4ef4-93f2-7b152248ada0",
    "Content-Type": "application/json"
  }
}

export const initialCards = [
  {
    name: 'Alaska Range',
    link: 'https://www.travelandleisure.com/thmb/aw1hyc5dIRbZE_Hjr7vkrjB_P_k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-alaska-range-USMNTNSTMOG0623-cddd55a6d03f4935ab43a97da82fb0ae.jpg',
  },
  {
    name: 'Great Smoky Mountains',
    link: 'https://www.travelandleisure.com/thmb/Kgb4PoS05a66J3R9qq1CFeGq8f0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/great-smoky-mountains-USMNTNS0720-85421f95ebc342fabf4b17fcede2a7ff.jpg',
  },
  {
    name: 'Teton Range',
    link: 'https://www.travelandleisure.com/thmb/GmekR2hjot6B2mWovmI4J192nSk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-grand-teton-USMNTNSIPOG0823-2538d183b9094e3fb59dd5e54bbe791c.jpg',
  },
  {
    name: 'Uinta Montains',
    link: 'https://www.travelandleisure.com/thmb/bJMyN_3JBEi2SuSnexOoUqO9hOA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/uinta-mountains-USMNTNS0720-143e32955e1543c2a0674a501e280f88.jpg',
  },
  {
    name: 'Sawtooth Range',
    link: 'https://www.travelandleisure.com/thmb/i5cVcgXQ1Cy2BFDif0HT6it7W9A=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/sawtooth-mountains-USMNTNS0720-2ad167c1f008453a8d362efe5a5c302a.jpg',
  },
  {
    name: 'Bighorn Montains',
    link: 'https://www.travelandleisure.com/thmb/8uYE4jQ_y1o2629zU9S7cUKCj6s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bighorn-mountains-wyoming-USMNTNS0720-cb9457943a8d491b9c1eaae0bd3e8c1f.jpg',
  },
  {
    name: 'Elias National Park',
    link: 'https://www.travelandleisure.com/thmb/g727-mPNmnsphYdSQ2_7PW74KvQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/wrangell-st-elias-national-park-alaska-BEAUTYSTS0522-aa733bbb6af64cd4b64d2672a30bc8ac.jpg',
  },
];
