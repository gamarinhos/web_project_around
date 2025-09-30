const popupProfile = document.querySelector('.popup-profile');
const popupProfileForm = popupProfile.querySelector('.popup-profile__form');
const popupProfileName = popupProfileForm.querySelector('#profile-name');
const popupProfileJob = popupProfileForm.querySelector('#profile-job');
const displayName = document.querySelector('.profile__name');
const displayJob = document.querySelector('.profile__job');

function togglePopupProfile() {
    popupProfile.classList.toggle('popup-profile_active');
    
    popupProfileName.value = displayName.textContent;
    popupProfileJob.value = displayJob.textContent;
    
}

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup-profile__close-button');

popupProfileOpenButton.addEventListener('click', togglePopupProfile);
popupProfileCloseButton.addEventListener('click', togglePopupProfile);


popupProfileForm.addEventListener('submit', function(evt){
    evt.preventDefault();

    displayName.textContent = popupProfileName.value;
    displayJob.textContent = popupProfileJob.value;

    popupProfile.classList.remove('popup-profile_active');
});