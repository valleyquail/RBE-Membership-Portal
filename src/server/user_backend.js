import User from "../models/User";

const manageUsers = (app) => {
  app.get("/getProfile", async (req, res) => {
    console.log(req.session.user._id);
    const result = await User.find({ _id: req.session.user._id });

    let body = JSON.stringify(result);
    console.log("gotten data: ", result);
    res.send(body);
  });

  app.post("/updateProfile", async (req, res) => {
    let data = req.body;
    console.log("edited data: ", data);
    data.map(async (item) => {
      const result = await User.updateOne(
        { user_id: item.user_id },
        {
          $set: {
            name: item.name,
            pronouns: item.pronouns,
            bio: item.bio,
            email: item.email,
            iqp_term: item.iqp_term,
          },
        }
      );
      console.log("result:", result);
    });
    console.log("should have updated");
    res.redirect("/getProfile");
  });
};

export default manageUsers;
