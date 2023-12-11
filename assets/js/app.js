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
  //add to localStorage
  addTweetLocalStorage(tweet);
};

const addTweetLocalStorage = (tweet) => {
  console.log("localStorage");
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
  removeTweetsFromLocalStorage();
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
