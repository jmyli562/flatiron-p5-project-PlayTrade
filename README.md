# Flatiron Phase 5 Project PlayTrade 

# Screenshots
![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/d57d937c-e9fb-4a3a-b0c8-ec594d123c35)


![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/b20cd865-b27f-43ee-a968-0d416b6d5dfc)


![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/153ef017-636c-4f14-b061-e11688097508)


## ERD Diagram
![Untitled](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/6b061437-3f2e-4072-9ea3-5976248fd058)

## Introduction
PlayTrade is a fully functioning video game e-commerce website that has the following features:
1) Create an account & login
2) Browse games and search for specific games using a search bar and filters
3) Leave reviews for games & accumulate points
4) Leave comments on reviews
5) Add games to your cart and purchase games using points
6) View your game library
7) Edit your profile username, email, password, and a profile picture

Video game data was retrieved from the RAWG.io API: https://rawg.io/apidocs

## Getting Started 

### Installation
Make sure that you have Python version 3.8.13 installed before you proceeed with the instructions below.
Once you have Python installed please follow the steps below inside of a new terminal to get this application running on your local machine.

```shell
# Clone the repository
git clone git@github.com:jmyli562/flatiron-p5-project-PlayTrade.git

# Navigate to the project directory
cd flatiron-p5-project-PlayTrade

# Navigate into the server directory
cd server

# Download the dependencies for the backend server and enter the virtual environment
pipenv install && pipenv shell

# Start the Flask server
python app.py

# Open a new terminal in your code editor

# Navigate to the client directory
cd client

# Install the dependencies for the frontend
npm install

# Run the app
npm start
```
## Comprehensive Usage Guide
After running npm start in the terminal, a new tab should open up and bring you to the home page of my application. You are able to create an account by clicking on "Login/Signup" in the top right corner.

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/87b5edb0-8972-4300-a61e-d04e5754c4ea)

This will bring you to a register page were you can create your account. 

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/62c5faed-06ca-4c0c-93d2-b0483ed8440b)

Immediately after creating your account, you should be brought to the login page where you can login using the credentials you entered earlier.

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/b7ef7b9b-c576-434b-91c5-44221682486c)

Once you are authenticated you will be brought back to the home page and now you have full access to the application!

You can browse all the of the available games by clicking on "Browse Games". Here you will see a selection of all the games available and information about the game such as the games name, release date, star-rating, and number of reviews. There is a search bar that you can use to manually search for a game by typing the game that you want to find. There are also additional filters that you can use by clicking on the "Sort By" dropdown that allows you to filter the games alphabetically, by release date, and by rating. You can leave a review for a game by clicking on "Leave a Review" or add a game to cart by clicking the Add Game to Cart buton.

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/8581906a-5b6e-4fcb-80a8-95f272432498)

When you click "Add a Review", it will display the reviews that the game has as well as information about the user who left that review. If the game does not have any reviews, you can create an review by clicking the "Create a Review" button" and this will redirect you to a different page where you can create a review.

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/cf6521ed-02fd-45db-83da-a2e757c9f77d)

After you leave a review, you will be credited with 10 points and you can view the review that you just made by clicking on the game again. You are allowed to delete or modify your own review by clicking the dedicated button. You may also leave a comment on your own review or on anyone elses review.

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/ab7e7a9a-de5d-4625-a8b5-8fa96015d7c2)

You can purchase games using the points you accumulate by leaving reviews. Each game has a set point value of 60, and if you want to purchase a game you can click on the "Add game to cart button" and it will show up in your shopping cart. You can find the shopping cart on the navigation bar on the top right. On the shopping cart tab, you can review your order and purchase the game as long as you have a sufficient amount of points or else the purchase button will be grayed out. When you have successfully purchased your game you will be brought to a order success page, and you can click on the "My Library" tab on the navigation tab to view your purchased game.

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/8d268ec0-3f02-42a0-bb52-25661bf888e1)
![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/c6c57d54-2d02-4e2e-b2d3-56f76bd229f7)

You can view your profile and edit your user details by clicking on your username in the top right corner of the navigation page. This will bring you to a profile page where you can edit your user details such as your username or password and allow you to upload a profile picture. 

![image](https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/46f3d366-57fa-43d7-b7e9-746f2a94b3c3)

Finally, you are able to logout of your account by pressing the "Logout" button found on below your username. This will log you out of your account and require you to enter your credentials again. If you need more clarifications on the features please watch my demo video below.

# Demo Video
Link to demo video: https://youtu.be/5AAvpTjlLTg?si=mZtcGCV-ACFpleVE

## Contributing
Pull requests are welcome. If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project
Create your Feature Branch (git checkout -b feature/NewFeature)
Commit your Changes (git commit -m 'Add some NewFeature')
Push to the Branch (git push origin feature/NewFeature)
Open a Pull Request
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT License

Copyright (c) 2023 Jimmy Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.






