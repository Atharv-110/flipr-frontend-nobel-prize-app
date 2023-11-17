![image](https://github.com/Atharv-110/flipr-frontend-nobel-prize-app/assets/87393095/051222c7-3efa-45a9-96f3-60ecfe95a6cc)


# Nobel App: Frontend Task for [**Flipr.ai**](https://flipr.ai/)
> Unveiling Brilliance, Celebrating Excellence — Your Gateway to Nobel Laureates' Legacy!

The "Nobel App" retrieves data about all Nobel Prize winners together with year, category and laureates' names from the Nobel Prize Winners API in a Tabular Form.
### Deployment: [Link](https://flipr-frontend-nobel-prize-app.vercel.app/) (All the tasks below can be tested here.)

## Tech Stack:
[![My Skills](https://skills.thijs.gg/icons?i=react,tailwind,materialui,css&theme=light&perline=6)](https://skills.thijs.gg)

## Tasks Completed:
- [x] Write a function to fetch prizes from the url. [Check Code here](https://github.com/Atharv-110/flipr-frontend-nobel-prize-app/blob/main/src/api.js)
- [x] Showcase the prize winners in a list. You can decide the layout and style. You have to display each prize and who has won that prize.
- [x] You should add a dropdown to filter prizes by category and year.
- [x] Year should be between 1900 - 2018, you can find out the category yourself by iterating over the data.
- [x] There are 4 people who have won the Nobel prize more than 1 time. You have to make a section in the app to display their information.

## Features:
- Load More Rows: This will not load all the data at once, only 10 rows at once will load and we can load more rows through **Load More Rows Button**
- Fully Mobile Responsive.
- **> 1 Button** in Mobile View: This will showcase *Task no. 5* in the *Mobile View*.
- Minimal UI for better User Experience. UI inspiration: [**Flipr.ai**](https://flipr.ai/)
- Handled the missing values through logic, eg: There were many Laureates with only Firstname and no Surname. It was showing undefined on the app so handled it via ternary operators.
- Implemented all the basic UI elements such as Navbar, Hero Section, Footer, Modal, etc.
