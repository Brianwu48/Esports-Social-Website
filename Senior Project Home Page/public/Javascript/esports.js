optionOne = document.getElementById("one");
optionTwo = document.getElementById("two");
optionThree = document.getElementById("three");
optionOne.style.display = 'block';
optionTwo.style.display = 'none';
optionThree.style.display = 'none';

function displayOne() {
    optionOne.style.display = 'block';
    optionTwo.style.display = 'none';
    optionThree.style.display = 'none';
}
function displayTwo() {
    optionOne.style.display = 'none';
    optionTwo.style.display = 'block';
    optionThree.style.display = 'none';
}
function displayThree() {
    optionOne.style.display = 'none';
    optionTwo.style.display = 'none';
    optionThree.style.display = 'block';
}

/**Functions for test pop up **/

function openForm(){
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}