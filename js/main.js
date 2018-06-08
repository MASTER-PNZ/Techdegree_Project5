// Global Variables to get html elements

const $container = $('.container');
const $search = $('#search_bar');

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

        // create modal div function including buttons
        createModal () {
        let modaldiv = `
        <div class="modal_window">
          <a href="#" class="close">&#x274C;</a>
          <img src="${this.picture.large}" alt/>
          <div class="employee_data">
            <h1>${this.name.first} ${this.name.last}</h1>
            <p class="username">${this.login.username}</p>
            <p class="email">${this.email}</p>
            <p class="cell-num">${this.cell}</p>
            <br>
            <p class="address">${this.location.street}<br/>${this.location.city}, ${this.location.state} ${this.location.postcode}</p>
            <p class="dob">Birthday: ${this.dob}</p>
            </div>
          <a href="#" class="prev">&larr</a>
          <a href="#" class=next">$rarr</a>
        </div>
        `;
        return modaldiv;
        }
}

// array of employee data

let employeeArr = [];

// Fetch request for user API
const getUserInfo = () => {
return fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture,login,cell,dob&nat=US,NZ')
    .then(response => response.json())
    .then(data => {return data.results});
}


// function to push random user data to the employees array and display user divs.
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


// event listener for boxes

// event listener for search_bar
//
// $search.on('keyup', function (employeeArr) {
// employeeArr.forEach(function (index){
// if ($search.val)
//
// });
//
// });

// event listener for modal buttons
