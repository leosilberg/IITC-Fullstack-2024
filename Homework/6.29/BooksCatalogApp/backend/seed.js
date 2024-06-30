const { default: mongoose } = require("mongoose");
const connectDB = require("./config/db.js");
const Book = require("./models/book.model.js");

const DATA = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    description:
      "A novel about the serious issues of rape and racial inequality, but it's also full of warmth and humor.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian, Political Fiction",
    description:
      "A novel presenting a terrifying vision of a totalitarian future in which everything and everyone is slave to a tyrannical regime.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance, Fiction",
    description:
      "A romantic novel that also critiques the British landed gentry at the end of the 18th century.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Tragedy, Fiction",
    description:
      "A novel about the American dream and the roaring twenties, focusing on the mysterious Jay Gatsby and his unrequited love for Daisy Buchanan.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure, Epic",
    description:
      "An epic tale of the voyage of the whaling ship Pequod, commanded by Captain Ahab, who leads his crew on a quest for the great white whale, Moby Dick.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction, Young Adult",
    description:
      "A novel about the experiences of a young boy named Holden Caulfield, his disillusionment with the adult world, and his search for truth and meaning.",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "A fantasy novel about the journey of Bilbo Baggins, a hobbit who sets off on an adventure to win a share of the treasure guarded by the dragon, Smaug.",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    description:
      "A novel that intertwines the lives of private and public individuals during the time of the Napoleonic wars and the impact of the era on Tsarist society.",
  },
  {
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic, Poetry",
    description:
      "An ancient Greek epic poem that chronicles the adventures of Odysseus as he returns home from the Trojan War.",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Psychological Fiction, Crime",
    description:
      "A novel exploring the mental anguish and moral dilemmas of Raskolnikov, a poor ex-student who plans to kill a corrupt pawnbroker for her money.",
  },
];

async function main() {
  await connectDB();
  try {
    await Book.insertMany(DATA);
  } catch (error) {
    console.log(`seed: `, error);
  }finally{
    mongoose.connection.close()
  }
}
main();
