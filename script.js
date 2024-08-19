// @ts-nocheck

//GLOBAL
const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api/feedbacks";

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

const hastagListEl = document.querySelector(".hashtags");

const renderFeedbackItem = (feedbackItem) => {
  const feedbackItemHtml = `
  <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${feedbackItem.company}</p>
        <p class="feedback__text"> ${feedbackItem.text}</p>
    </div>
    <p class="feedback__date">${
      feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
    } </p>
</li>
  `;

  //insert new feedback item in list
  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHtml);
};

//-- COUNTER COMPONENT --

(() => {
  const inputHandler = () => {
    // determine maximum number of characters
    const maxNrChars = MAX_CHARS;

    // determine nuber of characters currently typed

    const nrCharsTyped = textareaEl.value.length;

    //calculate number of characters left ( maximum minus currently typed)

    const charsLeft = maxNrChars - nrCharsTyped;

    //show number of characters left
    counterEl.textContent = charsLeft;
  };

  textareaEl.addEventListener("input", inputHandler);
})();

//--FORM COMPOMENT@@@@@@@@@
(() => {
  const showVisuelIndicator = (textCheck) => {
    const className = textCheck === "valid" ? "form--valid" : "form--invalid";

    formEl.classList.add(className);

    //remove visual indicator
    setTimeout(() => {
      formEl.classList.remove(className);
    }, 2000);
  };

  const submitHandler = (event) => {
    // prevent form from submitting (submitting form data to 'action'-adress and refreshing page)
    event.preventDefault();

    //get text from textarea
    const text = textareaEl.value;

    //validate text  (e.g check if #hastag is present and text is long enough)
    if (text.includes("#") && text.length >= 5) {
      showVisuelIndicator("valid");
    } else {
      showVisuelIndicator("invalid");

      // focus textarea
      textareaEl.focus();

      //stop this function execution
      return;
    }

    // we have text, now extract toher info from text
    const hastag = text.split(" ").find((word) => word.includes("#"));
    const company = hastag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    //RENDER FEEDBACK ITEM IN LIST

    //create feedback item object
    const feedbackItem = {
      upvoteCount: upvoteCount,
      company: company,
      badgeLetter: badgeLetter,
      daysAgo: daysAgo,
      text: text,
    };
    //render feedback item
    renderFeedbackItem(feedbackItem);

    //send feedback item to server

    fetch(`${BASE_API_URL}/feedbacks`, {
      method: "POST",
      body: JSON.stringify(feedbackItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("somethinh went wrong");
          return;
        }
        console.log("succesfully submitted");
      })
      .catch((error) => console.log(error));

    // clear textarea
    textareaEl.value = "";

    //blur submit button
    submitBtnEl.blur();

    // reset counter
    counterEl.textContent = MAX_CHARS;
  };

  formEl.addEventListener("submit", submitHandler);
})();

//FEEDBACK LIST COMPONENT`

(() => {
  const clickHandler = (event) => {
    //get clicked htmlElement
    const clickedEL = event.target;

    //dtermine if user intended to upvote or expand
    const upvoteIntention = clickedEL.className.includes("upvote");
    //run the appropriate logic
    if (upvoteIntention) {
      //get the closest upvote button
      const upvoteBtnEl = clickedEL.closest(".upvote");

      //disable upvote button (prevent double-clicks , spam)
      clickedEL.disabled = true;

      //select the upvote count element within the upvote button
      const upvoteCountEl = upvoteBtnEl.querySelector(".upvote__count");

      //get currently dispalyed upvote count as number (+)
      let upvoteCount = +upvoteCountEl.textContent;

      //set upvote count incremented by 1
      upvoteCountEl.textContent = ++upvoteCount;
    } else {
      //expeand the clicked feedback item
      clickedEL.closest(".feedback").classList.add("feedback--expand");
    }
  };

  feedbackListEl.addEventListener("click", clickHandler);

  fetch(`${BASE_API_URL}/feedbacks`)
    .then((response) => response.json())
    .then((data) => {
      //remove spinner
      spinnerEl.remove();
      //iterate over each element in feedbakcs array and render it in list
      data.feedbacks.forEach((feedbackItem) => {
        renderFeedbackItem(feedbackItem);
      });
    })

    .catch((error) => {
      feedbackListEl.textContent =
        "failed to fetch feedback items. error message: `${error.message}`";
    });
})();
// hastag List componen

(() => {
  const clickHandler = (event) => {
    //get the clicked element
    // stop function if click happened in list, but outsie buttons
    const clickedEL = event.target;

    if (clickedEL.className === "hastags") return;

    //extract company name
    const companyNameFromHastag = clickedEL.textContent
      .substring(1)
      .toLowerCase()
      .trim();

    //iterate over each feedback item in the list
    feedbackListEl.childNodes.forEach((childNode) => {
      //stop this interation if its a text node
      if (childNode.nodeType === 3) return;

      //extract company name
      const companyNameFromFeedbackItem = childNode
        .querySelector(".feedback__company")
        .textContent.toLowerCase()
        .trim();

      //remove feedback iitem if company names are not equal
      if (companyNameFromHastag !== companyNameFromFeedbackItem) {
        childNode.remove();
      }
    });
  };

  hastagListEl.addEventListener("click", clickHandler);
})();
