const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    dob: Date,
    loves: [String],
    gender: String
});
const unicornModel = mongoose.model("unicorns", unicornSchema);

mongoose.connect("mongodb+srv://andyhplau:comp1537@cluster-comp1537-assign.679wm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyparser.urlencoded({
    extended: true
}));

app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})

app.use(express.static("./public"));

app.post("/findUnicornByName", function (req, res) {
    console.log("req. has been recieved")
    console.log(req.body.unicornName)
    
    unicornModel.find({
        name: req.body.unicornName
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + unicorns);
        }
        res.send(unicorns);
    });
})


app.post("/findUnicornByWeight", function (req, res) {
    console.log("req. has been recieved")
    console.log(req.body.lowerWeight, req.body.higherWeight)

    unicornModel.find({
        weight: {
            $gt: req.body.lowerWeight,
            $lt: req.body.higherWeight
        }
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + unicorns);
        }
        res.send(unicorns);
    });
})


app.post("/findUnicornByFood", function (req, res) {
    console.log("req. has been recieved")
    console.log(req.body.appleIsChecked)
    console.log(req.body.carrotIsChecked)
    aList = []

    if (req.body.appleIsChecked == "unchecked" && req.body.carrotIsChecked == "unchecked") {
        checkBlock = null
    } else {
        checkBlock = {
            loves: {
                $in: aList
            }
        }
    }

    if (req.body.appleIsChecked == "checked")
        aList.push("apple")

    if (req.body.carrotIsChecked == "checked")
        aList.push("carrot")

    unicornModel.find(
        checkBlock,
        function (err, unicorns) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Data " + unicorns);
            }
            res.send(unicorns);
        });
})


// app.post("/filters", function (req, res) {
//     console.log("filter req. has been recieved")
//     console.log(req.body.nameIsChecked)
//     console.log(req.body.weightIsChecked)
    // aList = []

    // if (req.body.appleIsChecked == "unchecked" && req.body.carrotIsChecked == "unchecked") {
    //     checkBlock = null
    // } else {
    //     checkBlock = {
    //         loves: {
    //             $in: aList
    //         }
    //     }
    // }

    // if (req.body.appleIsChecked == "checked")
    //     aList.push("apple")

    // if (req.body.carrotIsChecked == "checked")
    //     aList.push("carrot")

    // unicornModel.find(
    //     checkBlock,
    //     function (err, unicorns) {
    //         if (err) {
    //             console.log("Error " + err);
    //         } else {
    //             console.log("Data " + unicorns);
    //         }
    //         res.send(unicorns);
    //     });
// })