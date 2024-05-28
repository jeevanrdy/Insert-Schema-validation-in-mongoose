let mongoose = require("mongoose");

let actorsSchema = new mongoose.Schema({
  actorName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Name!`,
    },
    required: [true, "User Name is required"],
  },
  age: {
    type: Number,
    min: [1, "Invalid Number"],
    max: 100,
    required: true,
  },
  mail: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
    required: [true, "User Email is required"],
  },
  topMovies: String,
});

let Actor = new mongoose.model("actor", actorsSchema);

let saveToDataBase = async () => {
  try {
    let alluArjun = new Actor({
      actorName: "Allu Arjun",
      age: 42,
      mail: "alluarjun@gmail.com",
      topMovies: "Pushpa,Racegurram,Arya,Julai",
    });
    let prabhasRaju = new Actor({
      actorName: "Prabhas",
      age: 44,
      mail: "prabhas@gmail.com",
      topMovies: "Saalar,Bahubali,Mirchi,Chatrapati",
    });
    let jntr = new Actor({
      actorName: "J NTR",
      age: 41,
      mail: "jntr@gmail.com",
      topMovies: "Devara,Simhadri,YamaDonga,War2",
    });

    await Actor.insertMany([alluArjun, prabhasRaju, jntr]);
    console.log("Data Saved Successfully.");
  } catch (error) {
    console.log("Unable to Save Data.");
  }
};

let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jeevanrdy:jeevanrdy@skynet.ycaxxus.mongodb.net/TollyWood?retryWrites=true&w=majority&appName=SkyNet"
    );
    saveToDataBase();
    console.log("Connected to MDB successfully");
  } catch (error) {
    console.log("Unable to connect to MDB");
  }
};

connectToMDB();
