# FeedbackApp

Feedback Application

Overview

The Feedback Application allows users to submit and view feedback items. Users can provide feedback about different companies by including a hashtag, which will then be displayed on the page. The application also supports upvoting feedback items and filtering feedback based on hashtags.

Features

    •	Character Counter: Limits feedback text to a maximum of 150 characters.
    •	Form Validation: Ensures that feedback includes a hashtag and meets a minimum length requirement.
    •	Feedback Submission: Allows users to submit feedback, which is then rendered in a list.
    •	Upvote Functionality: Users can upvote feedback items, increasing their visibility.
    •	Filter by Hashtag: Users can filter feedback items by clicking on hashtags.

How It Works

Components

    •	Feedback Item Rendering: Feedback items are dynamically added to the feedback list with an upvote button, company badge, content, and date.
    •	Counter Component: Tracks and displays the number of remaining characters for feedback input.
    •	Form Component: Handles submission of feedback, including validation to ensure it meets the required format.
    •	Feedback List Component: Manages upvoting and expanding feedback items. It also fetches existing feedback from the server.
    •	Hashtag List Component: Allows filtering of feedback items based on the selected hashtag.

JavaScript

    •	Global Constants and Variables: Define constants like MAX_CHARS and BASE_API_URL and query selectors for DOM elements.
    •	Event Handlers: Handle user interactions such as form submission, upvoting, and filtering feedback.
    •	API Integration: Communicates with the server to submit and fetch feedback items.

Usage

    1.	Submitting Feedback
    •	Type your feedback into the textarea.
    •	Ensure that the feedback includes a hashtag (e.g., #CompanyName).
    •	Submit the feedback by clicking the “Submit” button.
    2.	Viewing Feedback
    •	Submitted feedback will appear in the feedback list.
    •	You can upvote feedback by clicking the upvote button.
    •	Feedback items can be expanded to view more details.
    3.	Filtering Feedback
    •	Click on any hashtag from the hashtag list to filter the displayed feedback items.

API Endpoint

The application interacts with the following API endpoint:

    •	Submit Feedback: POST https://bytegrad.com/course-assets/js/1/api/feedbacks
    •	Fetch Feedback: GET https://bytegrad.com/course-assets/js/1/api/feedbacks
