const Add = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const addFormStory = document.querySelector('#addStoryForm');
    addFormStory.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormStory.classList.add('was-validated');
        this._sendPost();
      },
      false
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      // this._goToDashboardPage();
    }
  },

  createId(length = 16) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  },

  _getFormData() {
    const photoInput = document.querySelector('#validationPhoto');
    const descriptionInput = document.querySelector('#validationDescription');
    console.log(descriptionInput);

    const prefixId = 'story';
    const storyId = `${prefixId}-${this.createId()}`;
    const createdAt = new Date().toISOString();

    return {
      id: storyId,
      name: 'Faisal Sulaiman',
      description: descriptionInput.value,
      photoUrl: photoInput.files[0],
      createdAt,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === ''
    );

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/homepage.html';
  },
};

export default Add;
