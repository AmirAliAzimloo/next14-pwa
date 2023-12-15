import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   text: {
      type: String,
      required: true,
   },
});


export default mongoose.models.Post || mongoose.model("Post", PostSchema);
