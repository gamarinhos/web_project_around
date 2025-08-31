const popupProfile = document.querySelector('.popup-profile');
const popupProfileForm = popupProfile.querySelector('.popup-profile__form');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup-profile__close-button');
const popupProfileName = popupProfileForm.querySelector('#profile-name');
const popupProfileJob = popupProfileForm.querySelector('#profile-job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function togglePopupProfile() {
    popupProfile.classList.toggle('popup-profile_active');

    popupProfileName.value = profileName.textContent;
    popupProfileJob.value = profileJob.textContent;

}

popupProfileOpenButton.addEventListener('click', togglePopupProfile);
popupProfileCloseButton.addEventListener('click', togglePopupProfile);


popupProfileForm.addEventListener('submit', function(evt){
    evt.preventDefault();

    profileName.textContent = popupProfileName.value;
    profileJob.textContent = popupProfileJob.value;

    popupProfile.classList.remove('popup-profile_active');
});

