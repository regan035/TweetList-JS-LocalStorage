// variables

const tweetList = document.getElementById("tweet-list");

//functions
const newTweet = (e) => {
  e.preventDefault();

  //read textarea target value
  const tweet = document.getElementById("tweet").value;
  // create remove button
  const removeButton = document.createElement("a");
  removeButton.classList.add("remove-tweet");
  removeButton.textContent = "X";
  //create li elements
  const li = document.createElement("li");
  li.textContent = tweet;
  li.appendChild(removeButton);
  tweetList.appendChild(li);
  //add to localStoraged
  addTweetLocalStorage(tweet);
  //clear form after submission
  document.getElementById("form").reset();
};

const addTweetLocalStorage = (tweet) => {
  // read existing tweet from localStorage
  let tweets = getTweetsFromLocalStorage();
  tweets.push(tweet);

  //convert tweet array into a string
  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const getTweetsFromLocalStorage = () => {
  let tweets;
  const existingTweets = localStorage.getItem("tweets");
  if (existingTweets === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(existingTweets);
  }
  return tweets;
};

const removeTweet = (e) => {
  if (e.target.classList.contains("remove-tweet")) {
    e.target.parentElement.remove();
  }
  // remove tweet from localStorage
  removeTweetsFromLocalStorage(e.target.parentElement.textContent);
};

const removeTweetsFromLocalStorage = (tweet) => {
  // get tweets from localStorage
  let tweets = getTweetsFromLocalStorage();

  // remove X from every tweet
  const tweetDelete = tweet.substring(0, tweet.length - 1);
  // loop through tweets and remove target tweet by using ===
  tweets.forEach((tweetInLocalStorage, index) => {
    if (tweetDelete === tweetInLocalStorage) {
      tweets.splice(index, 1);
    }
  });
  // apply change to localStorage
  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const localStorageOnLoad = () => {
  let tweets = getTweetsFromLocalStorage();

  //loop through tweets from  localStorage
  tweets.forEach((tweet) => {
    // create remove button
    const removeButton = document.createElement("a");
    removeButton.classList.add("remove-tweet");
    removeButton.textContent = "X";
    //create li elements
    const li = document.createElement("li");
    li.textContent = tweet;
    li.appendChild(removeButton);
    tweetList.appendChild(li);
  });
};

// event listeners
const eventListeners = () => {
  //form submission
  document.querySelector("#form").addEventListener("submit", newTweet);

  //remove tweet list
  tweetList.addEventListener("click", removeTweet);

  //load from local storage
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
};

eventListeners();
