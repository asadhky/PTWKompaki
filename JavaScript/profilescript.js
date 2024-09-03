const users = ['asad', 'sample', 'bahadur'];

const memberDiv = document.querySelector('.memberDiv');
const addIcon = document.querySelector('.addIcon');
const autoLoginForm = document.getElementById('autoLoginForm');
const autoUsername = document.getElementById('autoUsername');
const autoPassword = document.getElementById('autoPassword');

const userIcons = () => {
    users.reverse();
    users.map((curElem) => {
        memberDiv.insertAdjacentHTML('afterbegin', `
        <button class="btn"><span>${curElem}</span></button>
        `);
    });

    // Add event listeners to the new buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const username = event.target.innerText;
            autoUsername.value = username;
            autoPassword.value = username; // Assuming password is the same as username
            autoLoginForm.submit();
        });
    });
};

addIcon.addEventListener('click', () => {
    let userName = prompt('please enter your name');

    if(userName != null && !users.includes(userName)){
        users.push(userName);
        console.log(users);
        memberDiv.insertAdjacentHTML('afterbegin', `
        <button class="btn"><span>${userName}</span></button>
        `);

        // Add event listener to the new button
        document.querySelector('.btn').addEventListener('click', (event) => {
            const username = event.target.innerText;
            autoUsername.value = username;
            autoPassword.value = username; // Assuming password is the same as username
            autoLoginForm.submit();
        });
    } else {
        alert('username already exist');
    }
});

userIcons();
