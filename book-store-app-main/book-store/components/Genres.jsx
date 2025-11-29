import React from "react";

const genres = [
  { name: "Fantasy",query: "Fantasy Fiction", img: "../public/images/fantasy.jpg" },
  { name: "Romance",query: "Romance Fiction", img: "../public/images/Romance.jpg" },
  { name: "Arts", query: "Art",  img: "../public/images/arts.jpg" },
  { name: "History", query: "History",img: "../public/images/history.jpg" },
  { name: "Mystery", query: "Mystery Detective", img: "../public/images/mystery.jpg" },
  { name: "Business", query: "Business",img: "../public/images/business.jpg" },
  { name: "Biography",query: "Biography", img: "../public/images/biography.jpg" },
  { name: "Science", query: "Science",img: "../public/images/science.jpg" },
  { name: "Horror", query: "Horror Fiction",img: "../public/images/Horror.jpg" },
  { name: "Poetry",  query: "Poetry",img: "../public/images/Poetry.jpg" },
  { name: "Religion",query:"religion", img: "../public/images/religion.jpg" },
  { name: "Self-Help", query: "self-help",img: "../public/images/selfhelp.jpg" },
  { name: "Travel", query:"travel", img: "../public/images/travel.jpg" },
   { name: "Juvenile Fiction", query: "Children",img: "../public/images/children.jpg" },
    { name: "Cooking", query: "Cooking",img: "../public/images/cooking.jpg" },
   { name: "placeholder", img: "../public/images/placeholder-book.png" },
  

];

function Genres() {
  return genres;
}

export default Genres;
