# Guess The Random Number Javascript
Guess the number between 0 and 1000

# Latest version available here :

https://thomaslinux.github.io/GuessTheRandomNumberJavascript/

[mirror 1](https://html-preview.github.io/?url=https://github.com/thomaslinux/GuessTheRandomNumberJavascript/raw/refs/heads/main/index.html) | 
[mirror 2](https://previewhtml.github.io/?url=https%3A%2F%2Fgithub.com%2Fthomaslinux%2FGuessTheRandomNumberJavascript%2Fblob%2Fmain%2Findex.html) |
[mirror 3](https://raw.githack.com/thomaslinux/GuessTheRandomNumberJavascript/main/index.html)

# TODO

- [x] init function for faster reload when click on New Game

- [x] A better way to handle input of a number - ```<input type="text" inputmode="numeric" pattern="[0-9]*">```
Found here : https://stackoverflow.blog/2022/12/26/why-the-number-input-is-the-worst-input/#:~:text=input%20type%3D%22text%22%20inputmode%3D%22numeric%22

- [x] Number of wins in LocalStorage - up version to V3

- [x] Lang switch - switch between french and english (index.fr.html index.html ) **works !**

- [x] Move min and max indicators aside from the input

- [x] Cheats : add keys '-' or 'q' for dichotomic substraction and '+' or 's' for dichotomic addition

- [ ] make numpad keys work on snap mobile / chrome mobile / brave mobile

    - [ ] Handle caracter on input on chrome mobile by getting the last character of the input substring
     https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string#:~:text=substring
    
    - [ ] Handle the logic of key outside of verifKey(e) so it can be merged with the input substring ?

    - [ ] switch case for logic, function call if more keys do the same thing

- [ ] Modify css to accommodate the change
      
- [ ] Add a loadbar visual indicator

- [ ] Buttons should appear progressively as part of an initial tutorial on how to play the game. (remake the game ?)

- [-] Light theme switch : https://web.dev/articles/building/a-theme-switch-component OR https://nouvelle-techno.fr/articles/changez-de-theme-en-un-clic-tutoriel-html-css-js

    - [x] Theme change from option menu - https://webkit.org/blog/13096/css-has-pseudo-class/#:~:text=X%E2%80%9D%2E-,Dark%20mode%20toggle%20with%20no%20JS (up version V4)

- [ ] Cookie popup - To ask the user if he accepts to appear on the leaderboard and to have localdata saved (cookie preference check in script.js)

- [ ] Scoreboard - LocalStorage (3 column per game : int game_id, int time_on_game, int nb_plays)

    - [ ] Timer - For how much time has been spent on the site (world clock ?) and a timer per play
     
    - [ ] Play counter - Save the number of play
          
    - [ ] Adverage number of plays per wins (total plays / wins)
    
    - [ ] add Chart.js to have a performance Graph

- [ ] Global database :
    
    - [ ] Leaderboard - To know who plays the most

    - [ ] Wins per day count - So we know how popular is the site

- [ ] Additionnal Sections 
    
    - [ ] How to play  - To explain how to play from text instead of explaining manually

    - [ ] Settings section - To change
        
        - language

        - color theme

        - min and max 

    - [ ] About section - To advertise my awesome self

