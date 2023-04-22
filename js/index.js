const listPanel = document.getElementById("list-panel");
const listUl = document.getElementById("list");
const showPanel = document.getElementById("show-panel");
const myUser = {
    id: 20,
    username: "Amelia",
};
document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});
const fetchBooks = () => {
    fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then(renderBookTitles);
};
function renderBookTitles(data) {
    data.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = book.title;
        listUl.appendChild(li);
        li.addEventListener("click", () => showBoookDetails(book));
    });
}
function showBoookDetails(book){
    showPanel.innerHTML = "";
    const bookImage = document.createElement("img");
    bookImage.src = book.img_url;
    bookImage.alt = book.title;

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("h2");
    author.textContent = book.author;

    const subtitle = document.createElement("h2");
    subtitle.textContent = book.subtitle;

    const description = document.createElement("p");
    description.textContent = book.description;

    const userDiv = document.createElement("div");
    const userLi = book.user;

    userLi.forEach((user) => {
        const userLi = document.createElement("li");
        userLi.textContent = user.username;
        userDiv.appendChild(userLi);

    });

    const likeButton = document.createElement("button");
    likeButton.textContent = userDiv.innerHTML.includes(myuser.username)
    ? "unlike"
    : "like";

    likeButton.setAttribute("id", book.id);
    likeButton.addEventListener("click", (event) => {
        event.preventDefault();
        likeBook(book);
        
    });
    showPanel.append(
        bookImage,
        title,
        author,
        subtitle,
        description,
        userDiv,
        likeButton
    );
}
function likeBook(book) {
    const likeButton = document.getElementById(book.id);
    const likers = [];
    book.user.forEach((user) => likers.push(user));
    const userExist = liker.filter((user) => {
        return user.username == myUser.username;
    });
    console.log(userExist);
    if (userExist.lenth >= 1) {
        liker.pop();
        likeButton.textContent = "like";
    } else {
        likers.push(myUser);
        likeButton.textContent = "unlike";
    }
 }

 const options = {
    method: "PATCH",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        user: likers,
    }),
 };

 fetch(`http://localhost:3000/books/${book.id}`, options);
 then((res) => res.json());
 then((book) => {
    listUl.innerHTML = "";
    showBoookDetails(book);
    fetchBooks();
 });

 
 
    

