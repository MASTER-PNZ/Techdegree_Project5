// Global Variables to get html elements

const $container = $('.container');
const $search = $('#search_bar');

// Class constructor for random employee info and function to create box div.

class RandomUser {
    constructor (name, location, email, picture, cell, dob) {
        this.name = name;
        this.location = location;
        this.email = email;
        this.picture = picture;
        this.cell = cell;
        this.dob = dob;
    }
        // Create box div function
       createBox () {
          let boxdiv = `
            <div class="box">
            <img class="boximg" src="${this.picture.medium}" alt/>
              <div class="employee_data">
                <h3 class="name">${this.name.first} ${this.name.last}</h3>
                <p class="email">${this.email}</p>
                <p class="city">${this.location.city}</p>
              </div>
            </div>`;
            return boxdiv;
        }

  // create modal div function including buttons
        createModal (currentEmployee) {
          let date = this.dob.date.substr(0,10);
          let dateArr = date.split('-');
          let year = dateArr[0][2] + dateArr[0][3];
          let month = dateArr[1];
          let day = dateArr[2];
          let modalDate = month + '/' + day + '/' + year;
        let modaldiv = `
        <div class="modal_window">
          <a href="#" class="close">&#x274C;</a>
          <img class="modimg" src="${this.picture.large}" alt/>
          <div class="modemployee_data">
            <h1>${this.name.first} ${this.name.last}</h1>
            <p class="email">${this.email}</p>
            <p class="city">${this.location.city}</p>
            <hr>
            <p class="cell-num">${this.cell}</p>
            <p class="address">${this.location.street}<br/>${this.location.city}, ${this.location.state} ${this.location.postcode}</p>
            <p class="dob">Birthday:${modalDate}</p>
          </div>
          <a href="#" class="prev">&larr;</a>
          <a href="#" class="next">&rarr;</a>
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


// Function to push random user data to the employees array and display user divs.
function userDivs () {
getUserInfo()
  .then(results => {
    const users = results;
    users.map(usr => {
      const employee = new RandomUser(usr.name, usr.location, usr.email, usr.picture, usr.cell, usr.dob);
      employeeArr.push(employee);
    });
      employeeArr.map( employee => {
        const box = employee.createBox();
        $container.append(box);

        const modal = employee.createModal();
        $container.append(modal);

        $('.modal_window').hide();



      });

  // Event listener for boxes to show current modal window
      $('.box').on('click', function(){
        $(this).next().show();
        $('body').addClass('overlay');
        $('.box, #search_bar').addClass('disabled');
      });

  // Event listeners for modal buttons (close, previous, and next).
      $('.close').on('click', function (){
        $(this).parent().hide();
        $('body').removeClass('overlay');
        $('.box, #search_bar').removeClass('disabled');
      });

      $('.modal_window:eq(0) > .prev').hide();

      $('.prev').on('click', function (){
        let modDiv = $(this).parent();
        modDiv.hide();
        modDiv.prev().prev().show();
      });

      $('.modal_window:eq(11) > .next').hide();

      $('.next').on('click', function (){
        let modDiv = $(this).parent();
        modDiv.hide();
        modDiv.next().next().show();
      });

  // Event listener for search_bar
    $search.on('keyup', function(){
      let userSearch = $search.val().toLowerCase();
      let names = $('.name');
      for(i = 0; i < names.length; i += 1) {
        if ( names[i].innerHTML.indexOf(userSearch) > -1 ) {
          names[i].parentElement.parentElement.style.display = "";
        } else {
          names[i].parentElement.parentElement.style.display = 'none';
        }
      }
    });
  });
}

userDivs();
