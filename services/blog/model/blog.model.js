const { default: mongoose  } = require("mongoose");

const BlogSchema = new mongoose.Schema({ 
    title: {type: String},
    text: {type: String}
})
 
module.exports = {
    BlogModel: mongoose.model("Blog", BlogSchema)
}