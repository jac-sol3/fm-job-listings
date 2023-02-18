let arrFilterItems = [];

export function addFilterEventsToButtons() {
  const filterTechInfo = document.querySelectorAll(".tech-element");
  filterTechInfo.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!arrFilterItems.includes(this.textContent)) {
        addButtonToNavFilter(this.textContent);
        filterListElements();
      }
    });
  });
}

function addButtonToNavFilter(filterName) {
  arrFilterItems.push(filterName);

  const filterBtn = document.createElement("div");
  filterBtn.className = "filter-btn-element";

  const filterBtnName = document.createElement("span");
  filterBtnName.className = "filter-btn-element__name";
  filterBtnName.textContent = filterName;

  const filterBtnRemove = document.createElement("span");
  filterBtnRemove.className = "filter-btn-element__remove";

  filterBtn.appendChild(filterBtnName);
  filterBtn.appendChild(filterBtnRemove);
  document.querySelector("#filter-nav__btn-elements").appendChild(filterBtn);

  filterBtnRemove.addEventListener("click", removeButtonFromNavFilter);
}

function removeButtonFromNavFilter() {
  const btnElement = this.parentElement;
  const index = arrFilterItems.findIndex(
    (item) => item == this.parentElement.textContent
  );
  arrFilterItems.splice(index, 1);
  btnElement.remove();
  filterListElements();
}

function filterListElements() {
  const jobsList = document.querySelectorAll(".list-element");
  jobsList.forEach((item) => {
    let techList = [];
    item.querySelectorAll(".tech-element").forEach((item) => {
      techList.push(item.textContent);
    });

    const hasAllFilterItems = arrFilterItems.every((filterItem) =>
      techList.includes(filterItem)
    );

    if (!hasAllFilterItems) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });
}

document
  .querySelector("#filter-nav__btn-clear")
  .addEventListener("click", function () {
    arrFilterItems = [];
    document
      .querySelectorAll(".list-element")
      .forEach((element) => (element.style.display = "flex"));
    document
      .querySelectorAll(".filter-btn-element")
      .forEach((btn) => btn.remove());
  });
