const Homepage = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    // const fetchRecords = await fetch('/data/DATA.json');
    // const responseRecords = await fetchRecords.json();
    // this._userTransactionsHistory = responseRecords.results.transactionsHistory;
    // this._populateTransactionsRecordToTable(this._userTransactionsHistory);
    // this._populateTransactionsDataToCard(this._userTransactionsHistory);

    const fetchRecords = await fetch('/data/story-data.json');
    const responseRecords = await fetchRecords.json();
    this._userStories = responseRecords.listStory;
    this._populateUserStoriesToCard(this._userStories);
  },

  _initialListener() {
    const recordDetailModal = document.getElementById('recordDetailModal');
    recordDetailModal.addEventListener('show.bs.modal', (event) => {
      const modalTitle = recordDetailModal.querySelector('.modal-title');
      modalTitle.focus();
      const button = event.relatedTarget;
      const dataRecord = this._userStories.find((item) => {
        return item.id == button.dataset.recordId;
      });
      this._populateDetailTransactionToModal(dataRecord);
    });
  },

  _populateUserStoriesToCard(userStories = null) {
    if (!(typeof userStories === 'object')) {
      throw new Error(
        `Parameter userStories should be an object. The value is ${userStories}`
      );
    }

    if (!Array.isArray(userStories)) {
      throw new Error(
        `Parameter userStories should be an array. The value is ${transactionsHistory}`
      );
    }

    const recordBodyTable = document.querySelector('#card-container');

    recordBodyTable.innerHTML = '';
    if (userStories.length <= 0) {
      recordBodyTable.innerHTML = this._templateEmptyStory();
      return;
    }

    userStories.forEach((item) => {
      recordBodyTable.innerHTML += this._templateCard(
        item
      );
    });
  },

  _populateTransactionsDataToCard(transactionsHistory = null) {
    if (!(typeof transactionsHistory === 'object')) {
      throw new Error(`Parameter responseRecords should be an object.`);
    }

    if (!Array.isArray(transactionsHistory)) {
      throw new Error('Parameter transactionsHistory should be an array.');
    }

    let amountIncome = 0;
    let amountExpense = 0;

    transactionsHistory.forEach((item) => {
      if (item.type === 'income') {
        amountIncome += item.amount;
      } else if (item.type === 'expense') {
        amountExpense += item.amount;
      }
    });

    document
      .querySelector('#transactions-card')
      .setAttribute('content', `${transactionsHistory.length} Transaksi`);
    document
      .querySelector('#income-card')
      .setAttribute('content', `Rp ${amountIncome}`);
    document
      .querySelector('#expense-card')
      .setAttribute('content', `Rp ${amountExpense}`);
  },

  _populateTransactionsRecordToTable(transactionsHistory = null) {
    if (!(typeof transactionsHistory === 'object')) {
      throw new Error(
        `Parameter transactionsHistory should be an object. The value is ${transactionsHistory}`
      );
    }

    if (!Array.isArray(transactionsHistory)) {
      throw new Error(
        `Parameter transactionsHistory should be an array. The value is ${transactionsHistory}`
      );
    }

    const recordBodyTable = document.querySelector('#recordsTable tbody');

    recordBodyTable.innerHTML = '';
    if (transactionsHistory.length <= 0) {
      recordBodyTable.innerHTML = this._templateEmptyBodyTable();
      return;
    }

    transactionsHistory.forEach((item, idx) => {
      recordBodyTable.innerHTML += this._templateBodyTable(
        idx,
        transactionsHistory[idx]
      );
    });
  },

  _populateDetailTransactionToModal(transactionRecord) {
    if (!(typeof transactionRecord === 'object')) {
      throw new Error(
        `Parameter transactionRecord should be an object. The value is ${transactionRecord}`
      );
    }
    const imgDetailRecord = document.querySelector(
      '#recordDetailModal #imgDetailRecord'
    );
    // const typeDetailRecord = document.querySelector(
    //   '#recordDetailModal #typeDetailRecord'
    // );
    const nameDetailRecord = document.querySelector(
      '#recordDetailModal #nameDetailRecord'
    );
    const dateDetailRecord = document.querySelector(
      '#recordDetailModal #dateDetailRecord'
    );
    // const amountDetailRecord = document.querySelector(
    //   '#recordDetailModal #amountDetailRecord'
    // );
    const descriptionDetailRecord = document.querySelector(
      '#recordDetailModal #noteDetailRecord'
    );
    imgDetailRecord.setAttribute('src', transactionRecord.photoUrl);
    imgDetailRecord.setAttribute('alt', transactionRecord.name);
    // typeDetailRecord.textContent =
    //   transactionRecord.type === 'income' ? 'Pemasukan' : 'Pengeluaran';
    nameDetailRecord.textContent = transactionRecord.name;
    dateDetailRecord.textContent = this._formatDate(transactionRecord.createdAt);
    // amountDetailRecord.textContent = transactionRecord.amount;
    descriptionDetailRecord.textContent = transactionRecord.description || '-';
  },

  _formatDate(date) {
    return new Date(date).toLocaleString('ID-id');
  },

  _templateBodyTable(index, transactionRecord) {
    return `
        <tr>
          <th class="text-center">${parseInt(index, 10) + 1}</th>
          <td>${
            transactionRecord.type === 'income' ? 'Pemasukan' : 'Pengeluaran'
          }</td>
          <td>${transactionRecord.name}</td>
          <td>${transactionRecord.amount}</td>
          <td>${transactionRecord.date}</td>
          <td>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <a class="btn btn-sm btn-primary" 
                data-bs-toggle="modal" data-bs-target="#recordDetailModal" 
                data-record-id="${transactionRecord.id}"
              >
                <i class="bi bi-eye-fill me-1"></i>Show
              </a>
              <a class="btn btn-sm btn-warning" href="/transactions/edit.html?id=${
                transactionRecord.id
              }">
                <i class="bi bi-pen-fill me-1"></i>Edit
              </a>
              <a class="btn btn-sm btn-danger" href="#">
                <i class="bi bi-trash3-fill me-1"></i>Delete
              </a>
            </div>
          </td>
        </tr>
      `;
  },

  _templateCard(userStory) {
    return `
    <div class="col" id="${userStory.id}">
    <div class="card shadow-sm">
      <img src="${userStory.photoUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${userStory.name}</h5>
        <p class="card-text">
          ${userStory.description}
        </p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <div class="btn-group">
            <a class="btn btn-sm btn-outline-secondary" 
              data-bs-toggle="modal" data-bs-target="#recordDetailModal" 
              data-record-id="${userStory.id}"
            >
              View
            </a>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              Edit
            </button>
          </div>
          <small class="text-body-secondary">${this._formatDate(userStory.createdAt)}</small>
        </div>
      </div>
    </div>
  </div>
    `;
  },

  _templateEmptyBodyTable() {
    const recordHeadTable = document.querySelector('#recordsTable thead');

    return `
        <tr>
          <td colspan="${recordHeadTable.querySelectorAll('td,th').length}">
            <div class="text-center">Tidak ada catatan transaksi</div>
          </td>
        </tr>
      `;
  },

  _templateEmptyStory() {
    return `<div class="text-center">No Data</div>`
  },
};

export default Homepage;
