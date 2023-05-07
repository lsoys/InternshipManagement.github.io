const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    delete: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: String,
        default: () => new Date().toLocaleString(),
    },
})

GroupSchema.pre('save', async function (next) {
    /* const existingGroup = await Group.findOne({ groupName: this.groupName });
    if (existingGroup) {
        // If the group name already exists, update the name with an incremented number suffix
        let nameSuffix = 1;
        let newName = `${this.groupName} (${nameSuffix})`;
        while (await Group.findOne({ groupName: newName })) {
            // If another group already exists with the updated name, increment the suffix and try again
            nameSuffix++;
            newName = `${this.groupName} (${nameSuffix})`;
        }
        this.groupName = newName;
    } */

    // If the group name already exists, update the name with an incremented number suffix    
    let matchingGroups = await Group.find({
        groupName: new RegExp(`^${this.groupName}(?:\\(\\d+\\))?$`, 'i')
    }).sort({ groupName: -1 }).limit(1)

    if (matchingGroups.length) {
        let lastGroup = matchingGroups[0];

        let lastGroupName = lastGroup.groupName;
        let match = lastGroupName.match(/^(.+)\((\d+)\)$/);
        if (match) {
            this.groupName = `${match[1]}(${parseInt(match[2]) + 1})`;
        } else {
            this.groupName = `${lastGroupName}(1)`;
        }
    }
    next();
});

const Group = mongoose.model("group", GroupSchema);

module.exports = Group;