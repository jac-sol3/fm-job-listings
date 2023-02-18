import { addFilterEventsToButtons } from "./filter-list.js";

const jobOfferHtmlElement = document.querySelector("#job-offer-list");

let jobOfferArr = [];
fetch("./js/data.json")
  .then((res) => res.json())
  .then((data) => jobOfferArr.push(...data))
  .then(renderListOnHtml)
  .then(addFilterEventsToButtons);

function renderListOnHtml() {
  const htmlContent = jobOfferArr
    .map((offer) => {
      const languages = offer.languages
        .map((lang) => `<span class="tech-element">${lang}</span>`)
        .join("");

      const tools = offer.tools
        .map((tool) => `<span class="tech-element">${tool}</span>`)
        .join("");

      const newStatus =
        offer.new == true ? `<span class="info-header__new">NEW</span>` : "";

      const featuredStatus =
        offer.featured == true
          ? `<span class="info-header__featured">FEATURED</span>`
          : "";

      return `
      <li class="list-element">
        <div class="list-element__logo">
          <img src="${offer.logo}" alt="${offer.company} logo">
        </div>
        <div class="list-element__info">
          <div class="list-element__info-header">
            <span class="info-header__company-name">${offer.company}</span>
            ${newStatus}
            ${featuredStatus}
          </div>
          <span class="list-element__info-position">${offer.position}</span>
          <ul class="list-element__info-time">
            <li class="info-time__element">${offer.postedAt}</li>
            <li class="info-time__element">${offer.contract}</li>
            <li class="info-time__element">${offer.location}</li>
          </ul>
        </div>
        <div class="list-element__tech">
          <span class="tech-element">${offer.role}</span>
          <span class="tech-element">${offer.level}</span>
          ${languages}
          ${tools}
        </div>
      </li>`;
    })
    .join("");

  jobOfferHtmlElement.innerHTML = htmlContent;
}
