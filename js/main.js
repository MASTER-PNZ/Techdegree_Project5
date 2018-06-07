// Global Variables to get html elements

const $container = $('.container');

// class constructor for random employee info and function to create box div.

class RandomUser {
    constructor (name, location, email, picture, login, cell, dob) {
        this.name = name;
        this.location = location;
        this.email = email;
        this.picture = picture;
        this.login = login;
        this.cell = cell;
        this.dob = dob;
    }
        // create box div function
       createBox () {
          let boxdiv = `
            <div class="box">
            <img src="${this.picture.medium}" alt/>
              <div class="employee_data">
                <h3>${this.name.first} ${this.name.last}</h3>
                <p class="email">${this.email}</p>
                <p class="city">${this.location.city}</p>
              </div>
            </div>`;
            return boxdiv;
        }
}

// array of employee data

let employeeArr = [];

// Fetch request for user API
const getUserInfo = () => {
return fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture,login,cell,dob&nat=US')
    .then(response => response.json())
    .then(data => {return data.results});
}


// function to add employees to the page
function userDivs () {
getUserInfo()
  .then(results => {
    const users = results;
    users.map(usr => {
      const employee = new RandomUser(usr.name, usr.location, usr.email, usr.picture, usr.login, usr.cell, usr.dob);
      employeeArr.push(employee);
    });
    employeeArr.map( employee => {
      const box = employee.createBox();
      $container.append(box);
    });
  });
}

userDivs();
// create modal div function including buttons

// create

// event listener for boxes

// event listener for search_bar

// event listener for modal buttons
