# Newsletter SignUp | Node.js ShellScript

> An automated workflow for form entry, created
> with puppeteer.js.

Requires `.env` configuration

---

In order to get this deployed for a client via an shortcut link on their home screen, the steps were to
 
1. Have nodejs on host machine
2. Clone the files to host machine
  - Get project up an running to confirm that it is working
3. Create sibling folder to the project `bin` folder
  - include a `newsletter.bat` file
  - optionally an icon file
4. Final step was to right click the bat file, create a shortcut to it for the home page.
  
 My bat file was really simple
 
 ```
 @echo off
 cd "C:\custom-programs\newsletter"
 powershell "npm i -g ./"
 powershell artstore
 ```
 
 
